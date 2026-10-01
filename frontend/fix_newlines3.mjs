import fs from 'fs';
import { globSync } from 'glob';
const files = globSync('src/**/*.{ts,tsx}');
files.forEach(f => { let c = fs.readFileSync(f, 'utf8'); if(c.includes('' + 'n')) { fs.writeFileSync(f, c.split('' + 'n').join('\n')); console.log('Fixed ' + f); } });
