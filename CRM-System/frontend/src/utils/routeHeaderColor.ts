/**
 * Every module's page header banner shares the same premium blue-to-indigo
 * gradient (matches the Dashboard's main banner) instead of the old
 * per-category solid colors.
 */
const HEADER_GRADIENT_CLASS = 'bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900'

export function getHeaderColorClass(_pathname: string): string {
  return HEADER_GRADIENT_CLASS
}
