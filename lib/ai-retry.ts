import { GoogleGenAI } from '@google/genai';
import { supabaseAdmin } from '@/lib/supabase';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export interface MediaPart {
  inlineData?: {
    data: string;
    mimeType: string;
  };
  fileData?: {
    fileUri: string;
    mimeType: string;
  };
  text?: string;
}

/**
 * Thrown when the Gemini API reports quota/rate-limit exhaustion on every
 * retry attempt. Routes should catch this and return a clear, honest
 * "temporarily unavailable" response (HTTP 503) instead of a cryptic error.
 * NOTE: when multiple API keys are configured (see getApiKey below), this is
 * thrown only after every key has been tried.
 */
export class AiQuotaExhaustedError extends Error {
  constructor() {
    super('AI is temporarily unavailable — today\u2019s usage limit has been reached. Please try again tomorrow.');
    this.name = 'AiQuotaExhaustedError';
  }
}

function isQuotaErrorMessage(msg: string): boolean {
  const m = msg.toLowerCase();
  return (
    m.includes('429') ||
    m.includes('resource_exhausted') ||
    m.includes('resource exhausted') ||
    m.includes('quota') ||
    m.includes('rate limit') ||
    m.includes('ratelimit') ||
    m.includes('too many requests')
  );
}

/**
 * Resolves the Gemini API key for this request. Supports key rotation:
 * set GEMINI_API_KEYS to a comma-separated list of keys and requests are
 * spread across them (each free-tier key gets its own daily quota).
 * Falls back to the legacy single GEMINI_API_KEY.
 */
function getApiKey(requestIndex: number): string {
  const list = (process.env.GEMINI_API_KEYS || '')
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean);
  if (list.length > 0) {
    return list[requestIndex % list.length];
  }
  return process.env.GEMINI_API_KEY || '';
}

export async function generateContentWithRetry<T = unknown>(
  prompt: string, 
  systemInstruction: string = '', 
  maxTokens: number = 2000, 
  forceJson: boolean = true,
  mediaParts: MediaPart[] = [],
  endpointName: string = 'unknown'
): Promise<T | string> {
  // 1. Check Circuit Breaker
  try {
    const { data: flag } = await supabaseAdmin
      .from('feature_flags')
      .select('is_enabled')
      .eq('key', 'ai_circuit_breaker')
      .single();
      
    if (flag && flag.is_enabled === false) {
      throw new Error('AI generation is temporarily disabled due to budget limits.');
    }
  } catch (e) {
    // If table doesn't exist or fetch fails, proceed silently
  }

  const maxRetries = 3;
  let attempt = 0;
  const baseDelay = 1000;
  let quotaFailures = 0;
  // Randomize the starting key so concurrent requests spread across keys.
  const keyOffset = Math.floor(Math.random() * 1_000_000);

  while (attempt < maxRetries) {
    try {
      const parts: MediaPart[] = [{ text: systemInstruction + '\n\n' + prompt }];
      if (mediaParts.length > 0) parts.push(...mediaParts);

      const apiKey = getApiKey(keyOffset + attempt);
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is missing.');
      }
      const ai = new GoogleGenAI({ apiKey });

      // Model is env-configurable (GEMINI_MODEL); defaults to gemini-3.6-flash.
      // NOTE 2026-09-25: the GEMINI_API_KEY is on the Gemini free tier
      // (20 generate requests/day/model). When one model's daily quota is
      // exhausted the API returns 429; switching GEMINI_MODEL to another
      // model with fresh quota restores service. Long-term fix: upgrade the
      // key to a paid tier (billing decision for Hamis). Alternative approved
      // direction: set GEMINI_API_KEYS to a comma-separated list of keys and
      // requests rotate across them (each key carries its own daily quota).
      const model = process.env.GEMINI_MODEL || 'gemini-3.6-flash';

      const response = await ai.models.generateContent({
        model,
        contents: [{ role: 'user', parts: parts as any }], // GenAI SDK internal type mismatch
        config: { 
          temperature: 0.1 + (attempt * 0.1),
          maxOutputTokens: maxTokens,
          responseMimeType: forceJson ? 'application/json' : 'text/plain'
        }
      });

      // Log Usage
      try {
        const usage = response.usageMetadata;
        if (usage) {
          const inputTokens = usage.promptTokenCount || 0;
          const outputTokens = usage.candidatesTokenCount || 0;
          // Approximate cost: $0.075 per 1M input, $0.30 per 1M output for 1.5 flash
          const costEstimate = (inputTokens / 1000000) * 0.075 + (outputTokens / 1000000) * 0.30;
          
          await supabaseAdmin.from('ai_usage_logs').insert({
            id: crypto.randomUUID(),
            session_id: 'anonymous', // we can extract from headers later if needed
            endpoint: endpointName,
            input_tokens: inputTokens,
            output_tokens: outputTokens,
            cost_estimate: costEstimate,
            cache_hit: false
          });
        }
      } catch (logError) {
        console.warn('Failed to log AI usage', logError);
      }

      let text = response.text || '';
      
      if (forceJson) {
        text = text.replace(/```json\n?|\n?```/gi, '').trim();
        const firstBrace = text.indexOf('{');
        const lastBrace = text.lastIndexOf('}');
        const firstBracket = text.indexOf('[');
        const lastBracket = text.lastIndexOf(']');
        
        if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
          text = text.substring(firstBrace, lastBrace + 1);
        } else if (firstBracket !== -1 && lastBracket !== -1) {
          text = text.substring(firstBracket, lastBracket + 1);
        }
        
        // Escape raw control characters inside JSON string values. Raw
        // newlines/tabs/returns inside strings are invalid JSON and a common
        // model mistake. NOTE: the previous version of this sanitizer was a
        // complete no-op (its regexes matched literal backslash sequences
        // instead of real control characters due to double-escaping), so
        // malformed model output could never be repaired.
        text = text.replace(/"(?:[^"\\]|\\.)*"/g, (str) =>
          str
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
        );
               
        // Remove trailing commas
        text = text.replace(/,\s*([}\]])/g, '$1');

        try {
          return JSON.parse(text) as T;
        } catch (parseError) {
          // PII-safe diagnostic for server logs (position info only, no content).
          const msg = parseError instanceof Error ? parseError.message : String(parseError);
          throw new SyntaxError(`JSON parse failed: ${msg} (response length ${text.length})`);
        }
      }

      return text;
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      if (errMessage.includes('AI generation is temporarily disabled')) {
        throw error;
      }
      if (error instanceof AiQuotaExhaustedError) {
        throw error;
      }

      attempt++;
      const isQuota = isQuotaErrorMessage(errMessage);
      if (isQuota) quotaFailures++;
      console.warn(`AI Generation Attempt ${attempt} failed:`, errMessage);

      if (attempt >= maxRetries) {
        // Every attempt hit quota/rate limits (possibly across rotated keys):
        // say so plainly instead of a cryptic "malformed output" error.
        if (quotaFailures === maxRetries) {
          throw new AiQuotaExhaustedError();
        }
        const lastMsg = error instanceof Error ? error.message : String(error);
        const kind = error instanceof SyntaxError ? 'parse' : 'api';
        throw new Error(forceJson ? `Failed to generate valid JSON after 3 attempts (last failure: ${kind}: ${lastMsg})` : `AI generation failed after 3 attempts (last failure: ${kind}: ${lastMsg})`);
      }
      
      await delay(baseDelay * Math.pow(2, attempt - 1));
      
      if (error instanceof SyntaxError && forceJson) {
        prompt = `CRITICAL SYSTEM ERROR PREVIOUSLY: YOU MUST RETURN ONLY RAW, VALID, PARSABLE JSON. NO MARKDOWN. NO BACKTICKS. NO CONVERSATION. \n\n` + prompt;
      }
    }
  }
  
  throw new Error('Unexpected end of generation loop');
}
