const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'app/build/page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Remove isDarkMode state and references
content = content.replace(/const \[isDarkMode, setIsDarkMode\] = useState\(false\);\n?/g, '');
content = content.replace(/const toggleDarkMode = \(\) => \{\n\s+setIsDarkMode\(!isDarkMode\);\n\s+trackEvent\('dark_mode_toggled'\);\n\s+\};\n?/g, '');

// 2. Remove Dark Mode Button
content = content.replace(/<button onClick=\{toggleDarkMode\}[^>]+>\s*\{isDarkMode \? <Sun size=\{16\} \/> : <Moon size=\{16\} \/>\}\s*<\/button>/g, '');

// 3. Update main container styling
content = content.replace(
  /<main className=\{cn\("flex flex-col lg:flex-row min-h-screen w-full font-sans selection:bg-black selection:text-white print:block print:h-auto print:overflow-visible", isDarkMode \? 'bg-gray-950 text-gray-100' : 'bg-\[#FAFAFA\] text-gray-900'\)\}>/,
  `<main className="flex flex-col lg:flex-row min-h-screen w-full font-sans selection:bg-black selection:text-white print:block print:h-auto print:overflow-visible bg-[#E8E7E1] text-[#141312]">`
);

// 4. Update editor panel styling
content = content.replace(
  /<section className=\{cn\("w-full lg:w-\[45%\] border-r print:hidden px-6 py-8 lg:px-10 lg:py-12 flex-shrink-0 relative", isDarkMode \? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'\)\}>/,
  `<section className="w-full lg:w-[45%] border-r-[4px] border-[#141312] print:hidden px-6 py-8 lg:px-10 lg:py-12 flex-shrink-0 relative bg-[#E8E7E1]">`
);

// 5. Update preview panel wrapper
content = content.replace(
  /<section className=\{cn\("w-full lg:w-\[55%\] flex-shrink-0 print:w-full print:bg-white print:p-0", isDarkMode \? 'bg-gray-950' : 'bg-gray-100'\)\}>/,
  `<section className="w-full lg:w-[55%] flex-shrink-0 print:w-full print:bg-white print:p-0 bg-[#E8E7E1]">`
);

// 6. Update inner preview container
content = content.replace(
  /<div className=\{cn\("relative mx-auto transition-transform duration-200", isDarkMode \? 'shadow-2xl shadow-black\/50' : 'shadow-2xl'\)\}/,
  `<div className="relative mx-auto transition-transform duration-200 shadow-2xl border-[4px] border-[#141312]"`
);

// 7. Update other dynamic classes
content = content.replace(/isDarkMode \? '[^']*' : /g, '');
content = content.replace(/className=\{cn\([^,]+, '([^']+)'\)\}/g, 'className="$1"');

// Fix buttons styling
content = content.replace(/className=\{cn\("p-2 rounded-lg transition-colors", 'hover:bg-gray-100 text-gray-500'\)\}/g, 'className="p-2 rounded-none transition-colors border-[3px] border-transparent hover:border-[#141312] hover:bg-[#141312] hover:text-[#E8E7E1] text-[#141312]"');

// Update input/textarea bg colors
content = content.replace(/bg-gray-50 border-gray-200/g, 'bg-white border-[3px] border-[#141312]');
content = content.replace(/bg-white border-gray-200/g, 'bg-[#E8E7E1] border-[3px] border-[#141312]');

// Update text classes
content = content.replace(/text-gray-900/g, 'text-[#141312]');
content = content.replace(/text-gray-500/g, 'text-[#141312]/70');
content = content.replace(/text-gray-400/g, 'text-[#141312]/50');

fs.writeFileSync(pagePath, content, 'utf8');
console.log('Updated styling in app/build/page.tsx');
