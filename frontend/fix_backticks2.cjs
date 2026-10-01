const fs = require('fs');
let c = fs.readFileSync('src/components/customers/EnterpriseCustomerShowcase.tsx', 'utf8');
c = c.replace(/`n/g, '\n');
fs.writeFileSync('src/components/customers/EnterpriseCustomerShowcase.tsx', c);
