import fs from 'fs';
import { globSync } from 'glob';
const files = globSync('src/**/*.{ts,tsx}');
files.forEach(f => { let c = fs.readFileSync(f, 'utf8'); if(c.includes('\
')) { fs.writeFileSync(f, c.replace(/\
/g, '\n')); console.log('Fixed ' + f); } });
