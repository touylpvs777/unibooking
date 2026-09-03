// Every page previously rolled its own `new Intl.NumberFormat('lo-LA')` for
// Kip amounts. Node's and Chromium's bundled ICU/CLDR data disagree on that
// locale's grouping separator (period vs comma), so any value formatted this
// way during SSR mismatches the client's re-render on hydration. 'en-US' is
// stable across runtimes, so every page should format through this one
// helper instead of repeating the ambiguous locale.
export function formatPrice(value) {
  return new Intl.NumberFormat('en-US').format(value || 0)
}
