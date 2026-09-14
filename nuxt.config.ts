// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ປິດ Server-Side Rendering (SSR) ເພື່ອແກ້ໄຂບັນຫາ 500 Server Error
  ssr: false,

  // ຕັ້ງຄ່າ Preset ສຳລັບ Vercel
  nitro: {
    preset: 'vercel'
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@ant-design-vue/nuxt', '@nuxtjs/i18n'],

  // Self-hosted Noto Sans Lao @font-face rules + the site's global
  // font-family (see app/assets/css/main.css) -- registered here so it's
  // injected on every page instead of only wherever it happens to get
  // imported from a component.
  css: ['~/assets/css/main.css'],

  // No global route prefix on the NestJS side (see unibooking-backend/src/main.ts),
  // so routes are POST /auth/login, GET /services/search, etc -- not /v1/*.
  // Nuxt 3 ຈະດຶງ NUXT_PUBLIC_API_BASE ຈາກ .env ມາແທນທີ່ອັດຕະໂນມັດ
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001'
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
    // @ts-ignore
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