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

const adminRoutes = walkSync(path.join(__dirname, '..', 'app', 'api', 'admin'));

adminRoutes.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let hasChanges = false;
  
  // Inject logAdminAction into the files that do POST/PUT/DELETE
  if ((content.includes('export async function POST') || content.includes('export async function PUT') || content.includes('export async function DELETE') || content.includes('export async function handleConfig')) && !content.includes('logAdminAction')) {
    
    if (!content.includes("import { logAdminAction }")) {
      content = "import { logAdminAction } from '@/lib/audit';\n" + content;
    }
    
    // Naively inject it right before `return NextResponse.json({ success: true` or similar
    const replacements = [
      { from: /return NextResponse\.json\(\{ success: true(.*?)\}\);/g, to: "await logAdminAction({ action: 'ADMIN_MUTATION', target_table: 'multiple', metadata: { file: '" + path.basename(path.dirname(file)) + "' } });\n    return NextResponse.json({ success: true$1});" },
      { from: /return NextResponse\.json\(\{\s*message: 'Success'(.*?)\}\);/g, to: "await logAdminAction({ action: 'ADMIN_MUTATION', target_table: 'multiple', metadata: { file: '" + path.basename(path.dirname(file)) + "' } });\n    return NextResponse.json({ message: 'Success'$1});" },
      { from: /return NextResponse\.json\((.*?)\);/g, to: "await logAdminAction({ action: 'ADMIN_ACTION', target_table: 'multiple', metadata: { file: '" + path.basename(path.dirname(file)) + "' } });\n    return NextResponse.json($1);" }
    ];
    
    // This regex might be too dangerous. It's safer to just modify config/route.ts, settings/route.ts explicitly.
  }
});
