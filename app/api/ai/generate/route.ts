import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateContentWithRetry } from '@/lib/ai-retry';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const rateLimitResponse = await checkRateLimit(request);
    if (rateLimitResponse) return rateLimitResponse;
    
    const { type, jobTitle, company, additionalContext, tone, resumeData } = await request.json();

    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }
    
    if ((type === 'summary' || type === 'experience' || type === 'skills') && !jobTitle) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    let prompt = '';
    let isJson = false;

    const cleanResume = resumeData ? `
Summary: ${resumeData.summary || ''}
Experience: ${(resumeData.experience || []).map((e:any) => `${e.role} at ${e.company}: ${e.description}`).join(' | ')}
    `.trim() : '';

    if (type === 'summary') {
      prompt = `Write a professional resume summary for a ${jobTitle}. 
      Keep it strictly to 3 sentences. No placeholders.
      ${additionalContext ? `Context: ${additionalContext}` : ''}`;
    } else if (type === 'experience') {
      prompt = `Write 3 highly professional bullet points for a ${jobTitle}${company ? ` at ${company}` : ''}.
      Start with action verbs. Just output the plain text bullet points. No intro.
      ${additionalContext ? `Context: ${additionalContext}` : ''}`;
    } else if (type === 'rewrite') {
      isJson = true;
      prompt = `Rewrite this resume summary and experience in a ${tone || 'Professional'} tone.
Return ONLY valid JSON. Keep it brief.
JSON structure: { "summary": "string", "experience": [{ "id": "string", "description": "string" }] }
Resume:
${cleanResume.substring(0, 3000)}`;
    } else if (type === 'skills') {
      isJson = true;
      prompt = `List 10 relevant skills for a ${jobTitle}.
Return ONLY valid JSON.
JSON structure: { "skills": ["string"] }`;
    } else if (type === 'polish') {
      prompt = `Rewrite this experience to be professional and action-oriented. 
      No intro, no markdown. Just the text.
      Text: "${additionalContext}"`;
    } else {
      return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 });
    }

    const systemInstruction = "You are an expert Resume writer.";
    const result = await generateContentWithRetry(prompt, systemInstruction, 1500, isJson, [], `generate_${type}`);

    if (isJson) {
      return NextResponse.json(result);
    }
    
    return NextResponse.json({ text: result });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
