const fs = require('fs');
const files = [
  'src/components/Forklift/store/CheckoutModal.tsx',
  'src/components/Forklift/store/PreCategoryNav.tsx',
  'src/context/CartContext.tsx',
  'src/components/Forklift/services/BookingContext.tsx'
];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/`n/g, '\n');
  fs.writeFileSync(f, c);
}
