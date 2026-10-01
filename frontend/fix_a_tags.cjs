const fs = require('fs');
let c = fs.readFileSync('src/pages/Forklift/ClientDashboardPage.tsx', 'utf8');
c = c.replace(/<a\s+to=/g, '<a href=');
c = c.replace(/<a\s+([^>]*?)to=/g, '<a $1href=');
fs.writeFileSync('src/pages/Forklift/ClientDashboardPage.tsx', c);
