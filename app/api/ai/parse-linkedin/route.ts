import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Data = Buffer.from(arrayBuffer).toString('base64');

    const prompt = `
      You are an expert resume parser. I am providing you with a LinkedIn Profile PDF.
      Your job is to extract the person's professional details and format them into a strict JSON object that matches our application's state.

      Return ONLY a valid JSON object with the following structure (do not include markdown block formatting, just raw JSON).
      
      {
        "personalInfo": {
          "fullName": "Extracted Name",
          "jobTitle": "Extracted current or primary job title",
          "email": "Extracted email if found, otherwise empty string",
          "phone": "Extracted phone if found, otherwise empty string",
          "location": "Extracted location (e.g. San Francisco, CA) if found, otherwise empty string",
          "website": "Extracted website/linkedin url if found, otherwise empty string"
        },
        "summary": "Extracted About section or summary. Rewrite slightly to be professional and third-person or first-person if appropriate.",
        "experience": [
          {
            "id": "generate a unique 6 digit random string",
            "company": "Company Name",
            "role": "Job Title",
            "startDate": "e.g., Jan 2020 or 2020",
            "endDate": "e.g., Present or Dec 2022",
            "description": "Extract the bullet points or description for this role. Separate each point with a newline character (\\n)."
          }
        ],
        "education": [
          {
            "id": "generate a unique 6 digit random string",
            "school": "School Name",
            "degree": "Degree Name",
            "graduationYear": "e.g. 2020"
          }
        ],
        "skills": [
          {
            "id": "generate a unique 6 digit random string",
            "name": "Skill Name"
          }
        ]
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: 'application/pdf'
          }
        },
        prompt
      ],
    });

    let rawJson = response.text || "{}";
    
    // Strip markdown code block formatting if Gemini includes it
    if (rawJson.startsWith('\`\`\`json')) {
      rawJson = rawJson.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
    } else if (rawJson.startsWith('\`\`\`')) {
      rawJson = rawJson.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
    }

    const parsedData = JSON.parse(rawJson);
    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error('LinkedIn Parse Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
