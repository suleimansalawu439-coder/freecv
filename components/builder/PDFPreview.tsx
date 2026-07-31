"use client";

import React, { useState, useEffect } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

interface PDFPreviewProps {
  TemplateComponent: any;
  data: any;
  themeColor: string;
}

export default function PDFPreview({ TemplateComponent, data, themeColor }: PDFPreviewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="w-full h-full bg-gray-100 flex items-center justify-center">Loading PDF...</div>;

  return (
    <PDFViewer style={{ width: '100%', height: '100%', border: 'none' }} showToolbar={false}>
      <TemplateComponent data={data} themeColor={themeColor} />
    </PDFViewer>
  );
}
