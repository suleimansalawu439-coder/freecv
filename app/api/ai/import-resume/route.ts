import { NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { generateContentWithRetry } from '@/lib/ai-retry';

export const runtime = 'edge';

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

    // Read PDF as base64
    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    const systemInstruction = `You are an expert ATS (Applicant Tracking System) parser. Your job is to read the attached PDF and structure it EXACTLY according to the JSON schema.`;
    
    const prompt = `
Rules:
1. Extract as much relevant information as possible.
2. If a field is missing, leave it as an empty string ("") or empty array ([]).
3. Do not make up information.
4. Format dates consistently if possible (e.g., "Jan 2020 - Present").
5. Return ONLY RAW valid JSON. Do NOT include markdown code blocks or backticks.
6. Make sure all strings are properly escaped. Do not use unescaped newlines in JSON values.
7. If the resume contains information that does not fit into standard sections, map them into the "customSections" array.

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
      "id": "string (generate unique id)",
      "company": "string",
      "role": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string"
    }
  ],
  "education": [
    {
      "id": "string (generate unique id)",
      "school": "string",
      "degree": "string",
      "graduationYear": "string"
    }
  ],
  "skills": [
    {
      "id": "string (generate unique id)",
      "name": "string"
    }
  ],
  "projects": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "link": "string"
    }
  ],
  "certifications": [
    {
      "id": "string",
      "name": "string",
      "issuer": "string",
      "date": "string"
    }
  ],
  "references": [
    {
      "id": "string",
      "name": "string",
      "title": "string",
      "company": "string",
      "contact": "string"
    }
  ],
  "customSections": [
    {
      "id": "string",
      "title": "string (e.g. 'Awards', 'Volunteering')",
      "items": [
        {
          "id": "string",
          "title": "string",
          "subtitle": "string",
          "date": "string",
          "description": "string"
        }
      ]
    }
  ]
}`;

    const mediaParts = [{
      inlineData: {
        data: base64Data,
        mimeType: 'application/pdf'
      }
    }];

    const parsedData = await generateContentWithRetry(prompt, systemInstruction, 8192, true, mediaParts, 'import_resume');

    return NextResponse.json(parsedData);
  } catch (error: any) {
    console.error('Resume Import Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during resume import.' },
      { status: 500 }
    );
  }
}
