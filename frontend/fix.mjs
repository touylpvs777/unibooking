import fs from 'fs';
let f1 = fs.readFileSync('src/pages/Forklift/StorePage.tsx', 'utf8');
f1 = f1.replace('[NEWLINE]', '\n');
fs.writeFileSync('src/pages/Forklift/StorePage.tsx', f1);
let f2 = fs.readFileSync('src/context/CartContext.tsx', 'utf8');
f2 = f2.replace(/\[NEWLINE\]/g, '\n');
fs.writeFileSync('src/context/CartContext.tsx', f2);
