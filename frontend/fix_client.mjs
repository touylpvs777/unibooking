import fs from 'fs';
let c = fs.readFileSync('src/pages/Forklift/ClientDashboardPage.tsx', 'utf8');
c = c.replace(/\
/g, '\n');
fs.writeFileSync('src/pages/Forklift/ClientDashboardPage.tsx', c);
