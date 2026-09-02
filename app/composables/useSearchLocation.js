// Shared "Location" value between the homepage's BookingSearchForm and
// ProvinceSelector, which are sibling components (both rendered from
// app/pages/index.vue) with no parent/child relationship to prop-drill
// through. useState gives both a handle on the same SSR-safe ref by key,
// which is Nuxt's idiomatic way to share state across components without a
// store dedicated to a single string field.
export function useSearchLocation() {
  return useState('search-location', () => '')
}
