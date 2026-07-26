import { NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json({ error: 'Resume data and job description are required' }, { status: 400 });
    }

    const prompt = `Analyze the following resume against the provided job description.
Return ONLY valid JSON (no markdown fences, no formatting, just raw JSON).
JSON structure must strictly match:
{
  "score": number (0-100),
  "strengths": string[],
  "weaknesses": string[],
  "missingKeywords": string[],
  "tips": string[]
}
Be strict and honest with scoring. Score based on: keyword match, experience relevance, skills alignment, formatting quality.

Job Description:
${jobDescription}

Resume:
${JSON.stringify(resumeData, null, 2)}
`;

    const res = await fetch('https://api.hcnsec.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'Kimi-K2.6',
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    let text = data.choices?.[0]?.message?.content || '';
    
    // Strip markdown code fences if present
    text = text.replace(/```json/gi, '').replace(/```/g, '').trim();

    let result;
    try {
      result = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse JSON from AI response:', text);
      return NextResponse.json({ error: 'Failed to parse AI response into valid JSON' }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('ATS Score Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate ATS score' }, { status: 500 });
  }
}
