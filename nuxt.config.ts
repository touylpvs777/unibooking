// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@ant-design-vue/nuxt', '@nuxtjs/i18n'],
  // No global route prefix on the NestJS side (see unibooking-backend/src/main.ts),
  // so routes are POST /auth/login, GET /services/search, etc -- not /v1/*.
  // Override with NUXT_PUBLIC_API_BASE for staging/prod builds.
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },
  // restructureDir: false keeps the classic layout (@nuxtjs/i18n v9+
  // otherwise expects a project-root i18n/locales/*.json) -- langDir then
  // resolves relative to the project ROOT (confirmed by an ENOENT against
  // app/locales/ during dev -- despite app/ being srcDir for pages/layouts/
  // stores/etc, this module resolves langDir against rootDir instead), so
  // translation files live at <rootDir>/locales/<code>.json as plain flat
  // maps, not under app/.
  // strategy: 'no_prefix' keeps every existing route/NuxtLink unprefixed
  // (still /explore, not /en/explore) -- this app has hundreds of absolute
  // links already written without a locale segment; prefixing would be a
  // breaking route change, not just an i18n config change.
  i18n: {
    restructureDir: false,
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    lazy: true,
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'lo', name: 'ລາວ', file: 'lo.json' },
      { code: 'th', name: 'ไทย', file: 'th.json' }
    ]
  },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    }
  }
})
