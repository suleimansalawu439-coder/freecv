import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { type, jobTitle, company, additionalContext, tone, resumeData } = await request.json();

    if (!type) {
      return NextResponse.json({ error: 'Type is required' }, { status: 400 });
    }
    
    if ((type === 'summary' || type === 'experience' || type === 'skills') && !jobTitle) {
      return NextResponse.json({ error: 'Job title is required' }, { status: 400 });
    }

    let prompt = '';

    if (type === 'summary') {
      prompt = `Write a professional resume summary for a ${jobTitle}. 
      Keep it concise, impactful, and between 3 to 4 sentences. 
      Focus on highlighting expertise, leadership, and value delivered.
      Do not include any placeholders like [Years of Experience].
      Make it sound natural but highly professional.
      ${additionalContext ? `Additional context to incorporate: ${additionalContext}` : ''}`;
    } else if (type === 'experience') {
      prompt = `Write 4 highly professional, action-oriented resume bullet points for a ${jobTitle}${company ? ` at ${company}` : ''}.
      Start each bullet point with a strong action verb (e.g., Spearheaded, Orchestrated, Optimized).
      Focus on measurable achievements and impact.
      Do not use introductory text or conclusion, just output the bullet points.
      Do not use asterisks or hyphens at the start of the lines, just the plain text for each bullet, separated by newlines.
      ${additionalContext ? `Additional context to incorporate: ${additionalContext}` : ''}`;
    } else if (type === 'rewrite') {
      prompt = `Rewrite the following resume summary and experience descriptions in a ${tone || 'Professional'} tone.
Return ONLY valid JSON (no markdown fences, no formatting, just raw JSON).
JSON structure must strictly match: { "summary": string, "experience": [{ "id": string, "description": string }] }
Resume Data:
${JSON.stringify(resumeData, null, 2)}`;
    } else if (type === 'skills') {
      prompt = `Provide a list of 10 highly relevant skills for a ${jobTitle}.
Return ONLY valid JSON (no markdown fences, no formatting, just raw JSON).
JSON structure must strictly match: { "skills": string[] }`;
    } else if (type === 'polish') {
      prompt = `Rewrite the following resume experience description to be highly professional, impactful, and action-oriented. 
      Start with a strong action verb (e.g., Spearheaded, Orchestrated, Optimized) and focus on measurable achievements.
      Do not include any introductory text, asterisks, or markdown formatting. Just return the polished text.
      Text to polish: "${additionalContext}"`;
    } else {
      return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 });
    }

    const res = await fetch('https://api.hcnsec.cn/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-IAMjxLayKVD4Gb4SANWnhZdY1hJeMOSYICzkBQ1tImJDsbFr'
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
    let generatedText = data.choices?.[0]?.message?.content || '';

    // If generating JSON for rewrite or skills, parse and return it directly
    if (type === 'rewrite' || type === 'skills') {
      generatedText = generatedText.replace(/```json/gi, '').replace(/```/g, '').trim();
      try {
        const result = JSON.parse(generatedText);
        return NextResponse.json(result);
      } catch (parseError) {
        console.error('Failed to parse JSON from AI response:', generatedText);
        return NextResponse.json({ error: 'Failed to parse AI response into valid JSON' }, { status: 500 });
      }
    }

    return NextResponse.json({ text: generatedText });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
