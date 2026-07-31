import { GoogleGenAI } from '@google/genai';
import { supabaseAdmin } from '@/lib/supabase';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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

  while (attempt < maxRetries) {
    try {
      const parts: MediaPart[] = [{ text: systemInstruction + '\n\n' + prompt }];
      if (mediaParts.length > 0) parts.push(...mediaParts);

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
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
        
        // Basic JSON sanitization for common AI mistakes
        text = text.replace(/\\n/g, "\\n")  
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
               
        // Remove trailing commas
        text = text.replace(/,\s*([}\]])/g, '$1');

        return JSON.parse(text) as T;
      }

      return text;
    } catch (error: unknown) {
      const errMessage = error instanceof Error ? error.message : String(error);
      if (errMessage.includes('AI generation is temporarily disabled')) {
        throw error;
      }
      
      attempt++;
      console.warn(`AI Generation Attempt ${attempt} failed:`, errMessage);
      
      if (attempt >= maxRetries) {
        throw new Error(forceJson ? 'Failed to generate valid JSON after 3 attempts' : 'AI generation failed after 3 attempts');
      }
      
      await delay(baseDelay * Math.pow(2, attempt - 1));
      
      if (error instanceof SyntaxError && forceJson) {
        prompt = `CRITICAL SYSTEM ERROR PREVIOUSLY: YOU MUST RETURN ONLY RAW, VALID, PARSABLE JSON. NO MARKDOWN. NO BACKTICKS. NO CONVERSATION. \n\n` + prompt;
      }
    }
  }
  
  throw new Error('Unexpected end of generation loop');
}
