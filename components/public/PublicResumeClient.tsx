"use client";

import dynamic from 'next/dynamic';

const PDFPreview = dynamic(() => import('@/components/builder/PDFPreview'), { ssr: false });

export function PublicResumeClient({ data }: { data: any }) {
  return <PDFPreview data={data} />;
}
