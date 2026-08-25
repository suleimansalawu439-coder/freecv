"use client";

import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import toast from 'react-hot-toast';

interface PDFDownloadButtonProps {
  TemplateComponent: any;
  data: any;
  themeColor: string;
  onDownloadComplete?: () => void;
  className?: string;
}

export default function PDFDownloadButton({ data, onDownloadComplete, className }: PDFDownloadButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const res = await fetch('/api/export/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to generate PDF');

      const blob = await res.blob();
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
    } catch (err: any) {
      toast.error('PDF export failed: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

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
