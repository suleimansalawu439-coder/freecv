const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'store/useResumeStore.ts');
let content = fs.readFileSync(storePath, 'utf8');

if (!content.includes('atsRecommendations: {')) {
  // Update ResumeData type
  content = content.replace(
    '  customSections: CustomSection[];\n}',
    '  customSections: CustomSection[];\n  atsRecommendations: { missingKeywords: string[], tips: string[] };\n}'
  );

  // Update initialData
  content = content.replace(
    '  customSections: []\n};',
    '  customSections: [],\n  atsRecommendations: { missingKeywords: [], tips: [] }\n};'
  );

  // Update ResumeStore interface
  content = content.replace(
    '  syncToCloud: () => Promise<void>;\n}',
    '  syncToCloud: () => Promise<void>;\n  setAtsRecommendations: (recommendations: { missingKeywords: string[], tips: string[] }) => void;\n}'
  );

  // Update store implementation
  content = content.replace(
    '        setAllData: (newData) => set((state) => ({',
    `        setAtsRecommendations: (recommendations) => set((state) => ({ data: { ...state.data, atsRecommendations: recommendations } })),\n        setAllData: (newData) => set((state) => ({`
  );
}

fs.writeFileSync(storePath, content, 'utf8');
console.log('Updated useResumeStore.ts with atsRecommendations');
