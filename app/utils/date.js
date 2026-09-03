// Same class of bug as utils/currency.js's formatPrice: `toLocaleDateString`
// with an explicit locale still depends on the runtime's bundled ICU/CLDR
// data (digit order, padding, separators can all disagree between Node and
// Chromium), and its local getDate()/getMonth()/getFullYear() components
// also depend on the host's timezone, which differs between the server and
// the viewer's browser. Both are hydration-mismatch hazards. This formats
// straight off the UTC calendar fields instead, so the result is a pure
// function of the input value -- identical on every runtime and timezone.
export function formatDate(value) {
  if (!value) return '-'
  const date = new Date(value)
  const day = String(date.getUTCDate()).padStart(2, '0')
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const year = date.getUTCFullYear()
  return `${day}/${month}/${year}`
}
