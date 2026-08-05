import { NextResponse } from 'next/server';
import { generateContentWithRetry } from '@/lib/ai-retry';
import { trackEvent } from '@/lib/analytics';
import { checkRateLimit } from '@/lib/rate-limit';

export async function POST(req: Request) {
  try {
    // 1. Rate Limiting (Strict 5 per hour per IP) with graceful in-memory fallback
    const rateLimit = await checkRateLimit(req, {
      limit: 5,
      windowMs: 3600_000,
      identifier: 'ip'
    });
    if (rateLimit) return rateLimit;


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
