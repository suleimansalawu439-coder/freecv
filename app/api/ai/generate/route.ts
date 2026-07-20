import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK
// It automatically picks up the GEMINI_API_KEY from environment variables
const ai = new GoogleGenAI({});

export async function POST(request: Request) {
  try {
    const { type, jobTitle, company, additionalContext } = await request.json();

    if (!jobTitle) {
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
    } else {
      return NextResponse.json({ error: 'Invalid generation type' }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const generatedText = response.text || '';

    return NextResponse.json({ text: generatedText });
  } catch (error: any) {
    console.error('AI Generation Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate content' }, { status: 500 });
  }
}
