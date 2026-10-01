const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.{ts,tsx}');
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  let original = content;

  // 1. Remove "use client" and "use server"
  content = content.replace(/"use client";?\r?\n?/g, '');
  content = content.replace(/"use server";?\r?\n?/g, '');

  // 2. Fix next-intl
  if (content.includes('next-intl')) {
    content = content.replace(/import\s+\{\s*useLocale\s*\}\s+from\s+["']next-intl["'];/g, 'import { useTranslation } from "react-i18next";');
    content = content.replace(/const\s+locale\s*=\s*useLocale\(\);/g, 'const { i18n } = useTranslation();\n  const locale = i18n.language || "lo";');
  }

  // 3. Fix next/image (convert to standard img)
  if (content.includes('next/image')) {
    content = content.replace(/import\s+Image\s+from\s+["']next\/image["'];?\r?\n?/g, '');
    content = content.replace(/<Image/g, '<img');
    content = content.replace(/fill(?:=\{true\})?/g, '');
  }

  // 4. Fix next/link (convert to react-router-dom Link)
  if (content.includes('next/link')) {
    content = content.replace(/import\s+Link\s+from\s+["']next\/link["'];?\r?\n?/g, 'import { Link } from "react-router-dom";\n');
    content = content.replace(/<Link([^>]+)href=/g, '<Link$1to=');
  }

  // 5. Fix type imports for InventoryItem
  content = content.replace(/import\s+\{\s*([^}]*?)InventoryItem([^}]*?)\}\s*from\s*(["'])@\/(data\/catalog|actions\/store)\3;/g, (match, p1, p2, p3, p4) => {
    let newImport = `import type { InventoryItem } from "@/${p4}";\n`;
    const others = [p1, p2].join('').split(',').map(s => s.trim()).filter(Boolean);
    if (others.length > 0) {
      newImport = `import { ${others.join(', ')} } from "@/${p4}";\n` + newImport;
    }
    return newImport;
  });

  // 6. Fix process.env.NEXT_PUBLIC_API_URL in order.ts
  if (content.includes('NEXT_PUBLIC_API_URL')) {
    content = content.replace(/process\.env\.NEXT_PUBLIC_API_URL/g, 'import.meta.env.VITE_API_BASE_URL');
  }

  if (content !== original) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Fixed', f);
  }
}
