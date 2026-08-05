import re

with open('app/build/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Import htmlTemplates at the top
if "from '@/components/html_templates'" not in content:
    content = re.sub(r"import\s*\{\s*templates\s*\}\s*from\s*'@/components/templates';", 
                     "import { templates } from '@/components/templates';\nimport { templates as htmlTemplates } from '@/components/html_templates';", 
                     content)

# 2. Add HTMLPreview component right after HTMLThumbnail
html_preview_code = """
const HTMLPreview = ({ Tmpl, data }: { Tmpl: any, data: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      // 816px is 8.5in at 96dpi
      const newScale = Math.min(1.5, entries[0].contentRect.width / 816);
      setScale(newScale);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#E8E7E1] flex justify-center overflow-auto p-4 sm:p-8 cv-riso custom-scrollbar">
      <div 
        className="bg-white shadow-2xl flex-shrink-0 relative border-[3px] border-[#141312] hs-c"
        style={{ 
          width: '816px', 
          height: '1056px', 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          marginBottom: `-${1056 * (1 - scale)}px`
        }}
      >
        <Tmpl data={data} themeColor={data.theme?.color || '#2563eb'} />
      </div>
    </div>
  );
};
"""
if 'const HTMLPreview =' not in content:
    content = re.sub(r'(const HTMLThumbnail = .*?\n};\n)', r'\1\n' + html_preview_code, content, flags=re.DOTALL)

# 3. Swap <PDFPreview> with <HTMLPreview> in the main layout
content = re.sub(
    r'<PDFPreview\s+TemplateComponent=\{SelectedTemplate\}\s+data=\{data\}\s*/>',
    '<HTMLPreview Tmpl={htmlTemplates[data.templateId as keyof typeof htmlTemplates]} data={data} />',
    content
)

# 4. Inject ATS auto-open useEffect
ats_use_effect = """
  // ATS Grader Auto-Open
  useEffect(() => {
    if (data.atsRecommendations) {
      setIsATSOpen(true);
      setAtsResult({
        score: 0,
        strengths: [],
        weaknesses: [],
        missingKeywords: data.atsRecommendations.missingKeywords || [],
        tips: data.atsRecommendations.tips || []
      });
      useResumeStore.getState().setAtsRecommendations(null);
    }
  }, [data.atsRecommendations]);
"""
if 'ATS Grader Auto-Open' not in content:
    # Inject it after const [atsResult, setAtsResult] = useState<any>(null);
    content = re.sub(r'(const \[atsResult, setAtsResult\] = useState<any>\(null\);\n)', r'\1' + ats_use_effect, content)


with open('app/build/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)
