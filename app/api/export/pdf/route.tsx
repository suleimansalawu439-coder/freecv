import { logger } from '@/lib/logger';
import { NextResponse } from 'next/server';
import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { templates } from '@/components/templates';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.personalInfo) {
      return NextResponse.json({ error: 'Invalid resume data' }, { status: 400 });
    }

    const templateId = data.templateId || 'Executive';
    const TemplateComponent = templates[templateId as keyof typeof templates] || templates.Executive;

    const pdfStream = await pdf(
      React.createElement(TemplateComponent, { data }) as any
    ).toBuffer();

    // Collect stream chunks into a single buffer
    const chunks: Uint8Array[] = [];
    await new Promise<void>((resolve, reject) => {
      pdfStream.on('data', (chunk: any) => chunks.push(chunk instanceof Uint8Array ? chunk : new Uint8Array(chunk)));
      pdfStream.on('end', () => resolve());
      pdfStream.on('error', (err: any) => reject(err));
    });
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=resume.pdf',
      },
    });
  } catch (error: any) {
    logger.error('pdf', 'PDF Export Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
