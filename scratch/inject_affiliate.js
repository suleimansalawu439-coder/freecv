const fs = require('fs');
let c = fs.readFileSync('app/page.tsx', 'utf8');

// 1. Add Check icon import
c = c.replace('import { \n  User,', 'import { \n  Check,\n  User,');

// 2. Add showDownloadSuccess state
const stateTarget = '  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);';
c = c.replace(stateTarget, '  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);\n  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);');

// 3. Update handleDownload
const downloadTarget = `  const handleDownload = () => {
    trackEvent('milestone_downloaded', data.templateId);
    triggerPrint();
  };`;
const downloadReplacement = `  const handleDownload = () => {
    trackEvent('milestone_downloaded', data.templateId);
    triggerPrint();
    setShowDownloadSuccess(true);
  };`;
c = c.replace(downloadTarget, downloadReplacement);

// 4. Inject Modal
const modalTarget = `      {/* AI REWRITER MODAL */}
      {isRewriterOpen && (`;
const modalReplacement = `      {/* DOWNLOAD SUCCESS MODAL WITH AFFILIATE JOBS */}
      {showDownloadSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm print:hidden">
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowDownloadSuccess(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            <div className="p-8 text-center pb-0">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} className="animate-bounce" />
              </div>
              <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
                Your Resume is Ready! 🎉
              </h2>
              <p className="text-gray-500 mb-8">
                Your PDF is downloading. While you wait, check out these exclusive {data.personalInfo.jobTitle || 'Professional'} roles actively hiring right now:
              </p>
            </div>
            
            <div className="px-6 pb-6">
              <SmartJobMatches jobTitle={data.personalInfo.jobTitle} />
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 text-center border-t border-gray-100 dark:border-gray-800 rounded-b-3xl">
              <button 
                onClick={() => setShowDownloadSuccess(false)}
                className="font-bold text-gray-500 hover:text-gray-700 uppercase tracking-widest text-sm"
              >
                Back to Editor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI REWRITER MODAL */}
      {isRewriterOpen && (`
c = c.replace(modalTarget, modalReplacement);

// 5. Inject Sticky Jobs below CV
const previewTarget = `            <SelectedTemplate data={data} />
          </div>
        </div>`;
const previewReplacement = `            <SelectedTemplate data={data} />
          </div>
        </div>
        
        {/* Affiliate Jobs - Below CV on desktop, below editor on mobile */}
        <div className="w-full max-w-[816px] mx-auto lg:mx-0 mt-8 mb-32 print:hidden origin-top-left px-4 sm:px-0">
           <SmartJobMatches jobTitle={data.personalInfo.jobTitle} />
        </div>`;
c = c.replace(previewTarget, previewReplacement);

// SEO Link in Header
const headerTarget = `<span className="hidden sm:inline font-black tracking-tight text-xl">FreeCV</span>`;
const headerReplacement = `<span className="hidden sm:inline font-black tracking-tight text-xl">FreeCV</span>
              <a href="/resume-templates" className="hidden md:inline-flex ml-6 text-sm font-semibold text-gray-500 hover:text-black transition-colors">Resume Templates</a>`;
c = c.replace(headerTarget, headerReplacement);

fs.writeFileSync('app/page.tsx', c);
console.log('Injected Affiliate features into app/page.tsx successfully using precise string replacements.');
