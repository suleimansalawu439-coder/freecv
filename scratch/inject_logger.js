const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist = []) {
  if (!fs.existsSync(dir)) return filelist;
  fs.readdirSync(dir).forEach(function(file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = walkSync(filePath, filelist);
    } else {
      if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        filelist.push(filePath);
      }
    }
  });
  return filelist;
};

const apiRoutes = walkSync(path.join(__dirname, '..', 'app', 'api'));
let replacedCount = 0;

apiRoutes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;
  
  if (content.includes('console.log(') || content.includes('console.warn(') || content.includes('console.error(')) {
    // Add import if not present
    if (!content.includes('import { logger } from \'@/lib/logger\'')) {
      content = 'import { logger } from \'@/lib/logger\';\n' + content;
    }
    
    const tag = path.basename(path.dirname(file));
    
    content = content.replace(/console\.log\((.*?)\)/g, (match, p1) => {
      replacedCount++;
      return `logger.info('${tag}', ${p1})`;
    });
    
    content = content.replace(/console\.warn\((.*?)\)/g, (match, p1) => {
      replacedCount++;
      return `logger.warn('${tag}', ${p1})`;
    });
    
    content = content.replace(/console\.error\((.*?)\)/g, (match, p1) => {
      replacedCount++;
      return `logger.error('${tag}', ${p1})`;
    });
    
    hasChanges = true;
  }
  
  if (hasChanges) {
    fs.writeFileSync(file, content);
  }
});

console.log(`Replaced ${replacedCount} console statements.`);
