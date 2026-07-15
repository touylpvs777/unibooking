/** @type {import('tailwindcss').Config} */
export default {
  // This app toggles dark mode via `data-theme="dark"` on <html> (see
  // src/providers/ThemeProvider.tsx), not a `.dark` class — match that here
  // so `dark:` utilities actually respond to the in-app theme toggle.
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // This app already ships its own comprehensive reset + design-token system
  // (see src/index.css and src/styles/tokens.css) that predates Tailwind —
  // Preflight's global element resets (h1-h6 font-size/weight collapsed to
  // `inherit`, all borders zeroed, button/input styling stripped, etc.)
  // fought with it and flattened the whole UI. Tailwind's own docs recommend
  // disabling Preflight in exactly this situation: keep every utility class
  // (leading-relaxed, pb-2, bg-white, shadow-sm, ...) fully working, without
  // Tailwind's base layer overwriting styles this app already owns.
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Lao"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
