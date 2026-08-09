const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../components/templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace <Text ...>\n  Something\n</Text> with <Text ...>Something</Text>
  const newContent = content.replace(
    /(<Text[^>]*>)\s*\n\s*([^<\n]+)\s*\n\s*(<\/Text>)/g,
    (match, p1, p2, p3) => {
      count++;
      return `${p1}${p2.trim()}${p3}`;
    }
  );

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed ${file}`);
  }
}
console.log(`Fixed ${count} occurrences.`);
