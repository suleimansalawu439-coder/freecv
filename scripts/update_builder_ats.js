import fs from 'fs';
import path from 'path';

const pagePath = path.join(__dirname, 'app/build/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

if (!content.includes('data.atsRecommendations?.missingKeywords?.length > 0')) {
  // Find where AI Tools Bar is rendered
  const toolsBarRegex = /\{\/\* AI Tools Bar \*\/\}\s*<div className="flex flex-wrap gap-2 mb-8">/;
  
  const recommendationsPanel = `
          {/* ATS Recommendations Panel */}
          {data.atsRecommendations?.missingKeywords?.length > 0 && (
            <div className="mb-8 p-6 bg-[#FFE14D]/10 border-[3px] border-[#141312] hs rounded-none">
              <h3 className="font-black text-lg uppercase tracking-wider mb-2 flex items-center gap-2">
                <BarChart3 size={20} className="text-[#FF4326]" /> 
                ATS Recommendations
              </h3>
              <p className="text-sm font-bold text-[#141312]/70 mb-4">Add these missing keywords to improve your match score.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {data.atsRecommendations.missingKeywords.map((k: string, i: number) => (
                  <span key={i} className="px-3 py-1.5 border-[2px] border-[#141312] bg-white text-xs font-bold shadow-[2px_2px_0_#141312]">{k}</span>
                ))}
              </div>
              <button 
                onClick={() => setAllData({ atsRecommendations: { missingKeywords: [], tips: [] } })}
                className="text-xs font-bold uppercase tracking-widest text-[#141312]/50 hover:text-[#141312]"
              >
                Dismiss
              </button>
            </div>
          )}
  `;

  content = content.replace(toolsBarRegex, recommendationsPanel + '\n          {/* AI Tools Bar */}\n          <div className="flex flex-wrap gap-2 mb-8">');
}

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated app/build/page.tsx with Recommendations Panel');
