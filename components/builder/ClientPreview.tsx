"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { templates, TemplateKey } from '@/components/templates';
import { useResumeStore } from '@/store/useResumeStore';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function ClientPreview() {
  const searchParams = useSearchParams();
  const templateParam = searchParams.get('template') as TemplateKey;
  const data = useResumeStore(state => state.data);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!templateParam || !templates[templateParam]) return;
    const SelectedTemplate = templates[templateParam];
    
    // Generate PDF blob
    const generatePDF = async () => {
      try {
        const blob = await pdf(<SelectedTemplate data={data} />).toBlob();
        setUrl(URL.createObjectURL(blob));
      } catch (e: any) {
        console.error('PDF generation error:', e.message);
      }
    };
    generatePDF();
  }, [templateParam, data]);

  if (!templateParam || !templates[templateParam]) {
    return <div>Invalid template</div>;
  }

  if (!url) return <div id="pdf-generating">Generating PDF...</div>;

  return (
    <div id="raw-template-container" style={{ width: '816px', height: '1056px', margin: 0, padding: 0, overflow: 'hidden', backgroundColor: 'white' }}>
      <Document 
        file={url} 
        onLoadError={(error) => console.error('Document load error:', error.message)}
        onSourceError={(error) => console.error('Document source error:', error.message)}
      >
        <Page 
          pageNumber={1} 
          width={816} 
          renderTextLayer={false} 
          renderAnnotationLayer={false} 
          onLoadError={(error) => console.error('Page load error:', error.message)}
          onRenderError={(error) => console.error('Page render error:', error.message)}
        />
      </Document>
    </div>
  );
}
