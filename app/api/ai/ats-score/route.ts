import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

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

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: { temperature: 0.3 }
    });

    let text = response.text || '';
    
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
