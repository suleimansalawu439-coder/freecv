"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, Loader2, AlertCircle } from 'lucide-react';
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
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDownload = useCallback(async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const blob = await pdf(<TemplateComponent data={data} themeColor={themeColor} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const safeName = (data.personalInfo?.fullName || 'My').replace(/[^\w\s-]/g, '').trim();
      const safeRole = (data.personalInfo?.jobTitle || 'Resume').replace(/[^\w\s-]/g, '').trim();
      a.download = `${safeName}_${safeRole}_Resume.pdf`.replace(/\s+/g, '_');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      trackEvent('resume_downloaded', data.templateId);
      if (onDownloadComplete) setTimeout(onDownloadComplete, 500);
    } catch (error: any) {
      console.error('PDF generation failed:', error);
      // Silently fail — the button returns to its default state
    } finally {
      setIsGenerating(false);
    }
  }, [TemplateComponent, data, themeColor, onDownloadComplete, isGenerating]);

  if (!isClient) {
    return (
      <button className={className} disabled>
        <Loader2 size={16} className="animate-spin" /> Preparing PDF...
      </button>
    );
  }

  return (
    <button onClick={handleDownload} disabled={isGenerating} className={className}>
      {isGenerating ? (
        <><Loader2 size={16} className="animate-spin" /> Generating PDF...</>
      ) : (
        <><Download size={16} /> PDF</>
      )}
    </button>
  );
}
