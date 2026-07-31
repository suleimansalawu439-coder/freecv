import fs from 'fs';
import path from 'path';

const pagePath = path.join(__dirname, 'app/build/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

const targetContent = `<div className="aspect-[8.5/11] bg-[#e5e7eb] w-full relative overflow-hidden flex justify-center pointer-events-none">
                      <div className="flex items-center justify-center w-full h-full text-[#141312]/50 font-bold uppercase tracking-widest text-xs">Preview Not Available</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>`;

const replacementContent = `<div className="aspect-[8.5/11] bg-[#e5e7eb] w-full relative overflow-hidden flex justify-center pointer-events-none">
                      <img src={\`/thumbnails/\${key}.webp\`} alt={\`\${key} Template\`} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.nextElementSibling!.classList.remove('hidden'); }} />
                      <div className="hidden absolute inset-0 flex items-center justify-center text-[#141312]/50 font-bold uppercase tracking-widest text-xs">Run Script</div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                    </div>`;

content = content.replace(targetContent, replacementContent);
fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated Builder gallery thumbnails.');
