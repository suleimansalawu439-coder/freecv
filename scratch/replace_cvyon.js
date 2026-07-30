const fs = require('fs');
const path = require('path');

const replacements = [
  { from: /FreeCV/g, to: 'Cvyon' },
  { from: /freecv\.app/g, to: 'cvyon.com' },
  { from: /freecv/g, to: 'cvyon' },
  { from: /Free CV/g, to: 'Cvyon' }
];

const ignoreDirs = ['node_modules', '.git', '.next', 'supabase', 'scratch'];
const validExts = ['.ts', '.tsx', '.js', '.jsx', '.json', '.md', '.sql', '.html', '.css'];

function walkAndReplace(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!ignoreDirs.includes(item)) {
        walkAndReplace(fullPath);
      }
    } else {
      const ext = path.extname(item);
      if (validExts.includes(ext) && item !== 'replace_cvyon.js' && item !== 'cvyon_master_config_guide.md') {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        for (const rule of replacements) {
          if (rule.from.test(content)) {
            content = content.replace(rule.from, rule.to);
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, content);
          console.log("Updated: " + fullPath);
        }
      }
    }
  }
}

walkAndReplace('c:\\xampp\\htdocs\\freecv');
console.log('Global rebranding complete.');
