import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateContentWithRetry } from '@/lib/ai-retry';

export const runtime = 'edge';

export async function POST(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const { resumeData, jobDescription, tone } = await req.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json({ error: 'Missing resume data or job description.' }, { status: 400 });
    }

    const prompt = `
Candidate Resume Summary & Experience:
${resumeData.summary}
${resumeData.experience.map((e: any) => `- ${e.role} at ${e.company} (${e.startDate} - ${e.endDate})\n  ${e.description}`).join('\n')}

Target Job Description:
${jobDescription}

Tone: ${tone || 'Professional'}

Rules:
1. Do NOT include placeholder bracketed text like [Date] or [Hiring Manager Name] or [Your Address]. Assume standard email format where the body is the main content.
2. Structure it in 3-4 paragraphs: Hook/Intro, Body (matching skills to the JD), and Call to Action/Outro.
3. Keep it concise, engaging, and highly specific to the provided experience.
4. Output ONLY the raw text of the cover letter. No markdown formatting, no conversational filler.
    `;
    
    const systemInstruction = "You are an expert career coach and executive resume writer. Write a highly-tailored, professional, and compelling cover letter for the candidate based on their resume data and the target job description.";

    const result = await generateContentWithRetry(prompt, systemInstruction, 1500, false, [], 'cover_letter');

    if (!result) {
      throw new Error("No response from AI");
    }

    return NextResponse.json({ text: result });
  } catch (error: any) {
    console.error('Cover Letter API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred generating the cover letter.' },
      { status: 500 }
    );
  }
}
