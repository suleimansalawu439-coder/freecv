"use client";

import React, { useState, useEffect } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface PDFDownloadButtonProps {
  TemplateComponent: any;
  data: any;
  themeColor: string;
  onDownloadComplete?: () => void;
  className?: string;
}

export default function PDFDownloadButton({ TemplateComponent, data, themeColor, onDownloadComplete, className }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <button className={className} disabled><Loader2 size={16} className="animate-spin" /> Preparing PDF...</button>;

  return (
    <PDFDownloadLink
      document={<TemplateComponent data={data} themeColor={themeColor} />}
      fileName={`Resume_${data.personalInfo.firstName || 'Cvyon'}.pdf`}
      className={className}
    >
      {({ blob, url, loading, error }) => {
        if (loading) {
          return <><Loader2 size={16} className="animate-spin" /> Generating PDF...</>;
        }
        
        // This is a bit of a hack to detect when the user clicks the link
        // react-pdf doesn't have an onClick natively on PDFDownloadLink render props,
        // but the wrapping <a> tag will handle the click.
        return (
          <span onClick={() => {
            trackEvent('resume_downloaded', data.templateId);
            if (onDownloadComplete) setTimeout(onDownloadComplete, 500);
          }} className="flex items-center gap-2">
            <Download size={16} /> Download PDF
          </span>
        );
      }}
    </PDFDownloadLink>
  );
}
