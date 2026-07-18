const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const issues = [];
for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const classMatches = content.match(/className="([^"]*)"/g) || [];
  let hasIssue = false;
  let fileIssues = [];
  
  for (const match of classMatches) {
    if (match.includes('h-screen')) fileIssues.push('h-screen');
    if (match.includes('h-full')) fileIssues.push('h-full');
    if (match.includes('h-[11in]')) fileIssues.push('h-[11in]');
    if (match.includes('overflow-hidden') && match.includes('w-full')) fileIssues.push('overflow-hidden');
    // check if it uses top/left/absolute that might clip
  }
  
  if (fileIssues.length > 0) {
    issues.push({ file, issues: [...new Set(fileIssues)] });
  }
}

console.log(JSON.stringify(issues, null, 2));
