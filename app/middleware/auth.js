// Guards any route that just needs a logged-in account (no role check --
// see middleware/supplier.js for that variant). Applied per-page via
// definePageMeta({ middleware: ['auth'] }), e.g. pages/checkout.vue and
// pages/profile.vue.
//
// Skips entirely on the server: the auth cookie is httpOnly and this app
// never forwards it for an SSR-side check (see authStore.initAuth()'s own
// `if (!process.client) return` -- the store starts empty on every SSR
// pass by design). Without this skip, a hard refresh on a protected page
// would always see a logged-out authStore during the server render and
// bounce to /login even for an actually-authenticated visitor. Nuxt
// re-runs middleware again client-side right after hydration for the very
// first navigation too, so the real check -- and the redirect if it fails
// -- still happens there. Each page also withholds its own content until
// that same client-side check resolves (its own onMounted awaits
// authStore.initAuth() again), so there's no flash of protected content
// either, closing the gap this middleware's server-side skip leaves open.
export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const authStore = useAuthStore()
  await authStore.initAuth()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
