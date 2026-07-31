const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/build/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Add imports
const importsToAdd = `
import dynamic from 'next/dynamic';
import { JobsModal } from '@/components/builder/JobsModal';
const PDFPreview = dynamic(() => import('@/components/builder/PDFPreview'), { ssr: false });
const PDFDownloadButton = dynamic(() => import('@/components/builder/PDFDownloadButton'), { ssr: false });
`;
content = content.replace("import { AuthModal } from '@/components/builder/AuthModal';", "import { AuthModal } from '@/components/builder/AuthModal';\n" + importsToAdd);

// 2. Add JobsModal state
content = content.replace("const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);", "const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);\n  const [isJobsModalOpen, setIsJobsModalOpen] = useState(false);");

// 3. Replace SelectedTemplate render with PDFPreview
content = content.replace("<SelectedTemplate data={data} />", "<PDFPreview TemplateComponent={SelectedTemplate} data={data} themeColor={data.theme?.color || '#2563eb'} />");

// 4. In the gallery, just hide it or keep it as HTML preview for now.
content = content.replace(
  /<div \s*className="origin-top transform scale-\[0\.16\][^"]*"[^>]*>\s*<Tmpl data=\{data\} \/>\s*<\/div>/g,
  `<div className="flex items-center justify-center w-full h-full text-gray-400 font-bold uppercase tracking-widest text-xs">Preview Not Available</div>`
);

// 5. Replace Download buttons
// In the mobile preview actions:
content = content.replace(
  /<button onClick=\{[^}]*setIsDownloadModalOpen\(true\)\}[^>]*>\s*<Download size=\{16\} \/> Download\s*<\/button>/g,
  `<PDFDownloadButton 
     TemplateComponent={SelectedTemplate} 
     data={data} 
     themeColor={data.theme?.color || '#2563eb'}
     onDownloadComplete={() => setIsJobsModalOpen(true)}
     className="flex-1 bg-[#141312] text-[#E8E7E1] border-[3px] border-[#141312] rounded-none hover:bg-[#FF4326] hover:text-[#141312] hs py-4 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-widest flex justify-center items-center gap-2 active:scale-95 transition-transform" 
   />`
);

// 6. Add JobsModal at the end of the file, before the last closing div/section.
content = content.replace("{isRewriterOpen && (", "<JobsModal isOpen={isJobsModalOpen} onClose={() => setIsJobsModalOpen(false)} />\n\n      {isRewriterOpen && (");

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated app/build/page.tsx successfully.');
