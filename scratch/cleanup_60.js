const fs = require('fs');
const path = require('path');

const names = [
  "Oxford", "Cambridge", "Stanford", "Berkeley", "Vanguard", "Apex", "Pinnacle", "Zenith", "Meridian",
  "Equinox", "Solstice", "Aurora", "Nova", "Stellar", "Lunar", "Solar", "Cosmos", "Galaxy", "Nebula",
  "Quantum", "Matrix", "Nexus", "Vertex", "Pulse", "Echo", "Oasis", "Mirage", "Haven", "Harbor",
  "Beacon", "Lighthouse", "Anchor", "Compass", "Atlas", "Titan", "Olympus", "Sparta", "Athens", "Rome",
  "Milan", "Paris", "London", "Tokyo", "Kyoto", "Berlin", "Vienna", "Zurich", "Geneva", "Monaco",
  "Cascade", "Alpine", "Summit", "Ridge", "Valley", "Canyon", "River", "Ocean", "Wave", "Tide",
  "Breeze"
];

const templatesDir = path.join('c:/xampp/htdocs/freecv/components/templates');

// 1. Delete the 60 files
let deletedCount = 0;
names.forEach(name => {
  const file = path.join(templatesDir, name + '.tsx');
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    deletedCount++;
  }
});
console.log(`Deleted ${deletedCount} programmatic templates.`);

// 2. Re-read remaining files and recreate index.ts
const remainingFiles = fs.readdirSync(templatesDir).filter(f => f.endsWith('.tsx') && f !== 'index.ts');
const remainingComponents = remainingFiles.map(f => f.replace('.tsx', ''));

let indexContent = '';
remainingComponents.forEach(comp => {
  indexContent += `import ${comp} from './${comp}';\n`;
});

indexContent += `\nexport const templates: Record<string, React.FC<any>> = {\n`;
remainingComponents.forEach(comp => {
  indexContent += `  ${comp},\n`;
});
indexContent += `};\n\nexport type TemplateKey = keyof typeof templates;\n`;

fs.writeFileSync(path.join(templatesDir, 'index.ts'), indexContent);
console.log(`Updated index.ts with ${remainingComponents.length} hand-coded templates.`);
