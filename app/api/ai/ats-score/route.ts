import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { resumeData, jobDescription } = await request.json();

    if (!resumeData || !jobDescription) {
      return NextResponse.json({ error: 'Resume data and job description are required' }, { status: 400 });
    }

    const cleanResume = `
Title: ${resumeData.personalInfo?.jobTitle || ''}
Summary: ${resumeData.summary || ''}
Experience: ${(resumeData.experience || []).map((e:any) => `${e.role} at ${e.company}: ${e.description}`).join(' | ')}
Education: ${(resumeData.education || []).map((e:any) => `${e.degree} from ${e.school}`).join(' | ')}
Skills: ${(resumeData.skills || []).map((s:any) => s.name).join(', ')}
    `.trim();

    const prompt = `Analyze the resume against the job description.
Return ONLY valid JSON. Keep generation extremely brief to save time.
JSON structure:
{
  "score": number, // 0-100
  "strengths": string[], // exactly 2 short points
  "weaknesses": string[], // exactly 2 short points
  "missingKeywords": string[], // exactly 4 words
  "tips": string[] // exactly 2 short points
}

Job:
${jobDescription.substring(0, 3000)}

Resume:
${cleanResume.substring(0, 3000)}
`;

    const res = await fetch('https://api.hcnsec.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'Kimi-K2.6',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 1500
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
