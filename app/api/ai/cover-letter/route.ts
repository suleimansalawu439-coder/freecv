import { NextResponse } from 'next/server';
import { generateContentWithRetry } from '@/lib/ai-retry';
import { trackEvent } from '@/lib/analytics';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (Strict 5 per hour per IP)
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimitKey = `ratelimit:coverletter:${ip}`;
    const requests = await redis.incr(rateLimitKey);
    
    if (requests === 1) {
      await redis.expire(rateLimitKey, 3600);
    }
    
    if (requests > 5) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in an hour.' },
        { status: 429 }
      );
    }

    // 2. Parse Request
    const { jobDescription, resumeText, tone = 'professional' } = await req.json();

    if (!jobDescription || !resumeText) {
      return NextResponse.json(
        { error: 'Job description and resume text are required' },
        { status: 400 }
      );
    }

    // 3. AI Prompt
    const systemPrompt = `You are an elite executive career coach and expert copywriter.
Write a highly compelling, tailored cover letter based on the provided Resume and Job Description.
The tone should be ${tone}.
Return a JSON object with a single field 'coverLetter' containing the full string. Use \n for paragraphs.
Do NOT include generic placeholders like [Company Name] if it's in the text.`;

    const userPrompt = `JOB DESCRIPTION:\n${jobDescription}\n\nRESUME:\n${resumeText}`;

    // 4. Generate
    let result: any = await generateContentWithRetry(userPrompt, systemPrompt, 1500, true, [], 'cover_letter');

    // 5. Analytics
    trackEvent('cover_letter_generated', tone);

    return NextResponse.json({ coverLetter: result.coverLetter || result.text || result });
  } catch (error: any) {
    console.error('Cover Letter AI Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate cover letter. Please try again.' },
      { status: 500 }
    );
  }
}
