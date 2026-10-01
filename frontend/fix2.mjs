import fs from 'fs';
let f2 = fs.readFileSync('src/context/CartContext.tsx', 'utf8');
f2 = f2.replace('react\;nimport', 'react\;\nimport');
fs.writeFileSync('src/context/CartContext.tsx', f2);
