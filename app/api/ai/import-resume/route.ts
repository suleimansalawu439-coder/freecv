import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { checkRateLimit } from '@/lib/rate-limit';
const pdfParse = require('pdf-parse');

// Use Node.js runtime (default) because pdf-parse relies on Node APIs
export const dynamic = 'force-dynamic';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  const rateLimitResponse = await checkRateLimit(req);
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Please upload a valid PDF file' }, { status: 400 });
    }

    // Extract text from PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdfParse(buffer);
    const textContent = pdfData.text;

    if (!textContent || textContent.trim().length === 0) {
      return NextResponse.json({ error: 'Could not extract text from the PDF' }, { status: 400 });
    }

    // Prompt Gemini to structure the data
    const prompt = `
You are an expert ATS (Applicant Tracking System) parser. I will provide you with the raw text extracted from a user's resume PDF.
Your job is to parse this text and structure it EXACTLY according to the JSON schema provided below.

Rules:
1. Extract as much relevant information as possible.
2. If a field is missing or cannot be reasonably inferred from the text, leave it as an empty string ("") or empty array ([]).
3. Do not make up information.
4. Format dates consistently if possible (e.g., "Jan 2020 - Present").
5. Return ONLY valid JSON. Do not include markdown code fences (like \`\`\`json) or any conversational text. Just the raw JSON object.

JSON Schema to match:
{
  "personalInfo": {
    "fullName": "string",
    "jobTitle": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "website": "string"
  },
  "summary": "string",
  "experience": [
    {
      "id": "string (generate a random short unique id)",
      "company": "string",
      "role": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string (bullet points separated by newlines)"
    }
  ],
  "education": [
    {
      "id": "string (generate random id)",
      "school": "string",
      "degree": "string",
      "graduationYear": "string"
    }
  ],
  "skills": [
    {
      "id": "string (generate random id)",
      "name": "string"
    }
  ]
}

Raw Resume Text:
"""
${textContent}
"""
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: { 
        temperature: 0.1, 
        maxOutputTokens: 2500,
        responseMimeType: 'application/json' 
      }
    });

    let rawJson = response.text || '{}';
    // Just in case Gemini still wraps it in markdown despite responseMimeType
    rawJson = rawJson.replace(/```json\n?|\n?```/g, '').trim();
    
    let parsedData;
    try {
      parsedData = JSON.parse(rawJson);
    } catch (e) {
      console.error('Failed to parse Gemini output:', rawJson);
      return NextResponse.json({ error: 'AI returned malformed JSON.' }, { status: 500 });
    }

    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error('Resume Import Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during resume import.' },
      { status: 500 }
    );
  }
}
