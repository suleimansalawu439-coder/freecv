const fs = require('fs');
const path = require('path');

const graderPath = path.join(__dirname, 'app/ats-grader/ClientAtsGrader.tsx');
let content = fs.readFileSync(graderPath, 'utf8');

// Inject useRouter and useResumeStore if not present
if (!content.includes('import { useRouter } from "next/navigation";')) {
  content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport { useRouter } from "next/navigation";\nimport { useResumeStore } from "@/store/useResumeStore";');
}

// Add router to component
if (!content.includes('const router = useRouter();')) {
  content = content.replace('export default function ClientAtsGrader() {\n', 'export default function ClientAtsGrader() {\n  const router = useRouter();\n  const setAtsRecommendations = useResumeStore(state => state.setAtsRecommendations);\n');
}

// Add handleFixResume function
if (!content.includes('const handleFixResume = () => {')) {
  const fixFunc = `
  const handleFixResume = () => {
    if (result) {
      setAtsRecommendations({
        missingKeywords: result.missingKeywords,
        tips: result.tips
      });
      router.push('/build');
    }
  };
  `;
  content = content.replace('const handleGrade = async () => {', fixFunc + '\n  const handleGrade = async () => {');
}

// Replace Link with button
content = content.replace(
  /<Link href="\/build" className="inline-block bg-\[#E8E7E1\] text-\[#141312\] px-6 py-3 fh font-black text-sm uppercase tracking-wider border-\[3px\] border-\[#E8E7E1\] hover:bg-\[#FFE14D\] hover:border-\[#FFE14D\] transition-colors">\s*Fix my resume in Builder\s*<\/Link>/g,
  '<button onClick={handleFixResume} className="inline-block bg-[#E8E7E1] text-[#141312] px-6 py-3 fh font-black text-sm uppercase tracking-wider border-[3px] border-[#E8E7E1] hover:bg-[#FFE14D] hover:border-[#FFE14D] transition-colors">Fix my resume in Builder</button>'
);

fs.writeFileSync(graderPath, content, 'utf8');
console.log('Updated ClientAtsGrader.tsx');
