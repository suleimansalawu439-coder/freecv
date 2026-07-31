"use client";

import dynamic from 'next/dynamic';

const PDFPreview = dynamic(() => import('@/components/builder/PDFPreview'), { ssr: false });

import { templates, TemplateKey } from '@/components/templates';

export function PublicResumeClient({ data }: { data: any }) {
  const Template = templates[data.templateId as TemplateKey] || templates['Executive'];
  return <PDFPreview TemplateComponent={Template} data={data} />;
}
