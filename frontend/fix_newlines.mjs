import fs from 'fs';
import { globSync } from 'glob';
const files = globSync('src/**/*.{ts,tsx}');
files.forEach(f => { let c = fs.readFileSync(f, 'utf8'); if(c.includes('[NEWLINE]')) { fs.writeFileSync(f, c.replace(/\[NEWLINE\]/g, '\n')); console.log('Fixed ' + f); } });
