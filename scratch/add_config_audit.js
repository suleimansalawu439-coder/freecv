const fs = require('fs');

const f = 'app/api/admin/config/route.ts';
let content = fs.readFileSync(f, 'utf8');

if (!content.includes('import { logAdminAction }')) {
  content = "import { logAdminAction } from '@/lib/audit';\n" + content;
}

if (!content.includes('action: \'UPDATE_CONFIG\'')) {
  content = content.replace(
    'return NextResponse.json({ ok: true, success: true });',
    "await logAdminAction({ action: 'UPDATE_CONFIG', target_table: target, target_id: key || id || 'bulk', metadata: { key, value } });\n    return NextResponse.json({ ok: true, success: true });"
  );
}

fs.writeFileSync(f, content);
console.log('Added logAdminAction to config/route.ts');
