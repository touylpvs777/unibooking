// Guards everything under /supplier: only SUPPLIER and ADMIN accounts may in.
// Applied per-page via definePageMeta({ middleware: ['supplier'] }).
//
// Skips entirely on the server: the auth cookie is httpOnly and this app
// never forwards it for an SSR-side check (see authStore.initAuth()'s own
// `if (!process.client) return` -- the store starts empty on every SSR
// pass by design). Nuxt re-runs middleware again client-side right after
// hydration for the very first navigation too, so the real check -- and
// the redirect if it fails -- still happens there. layouts/supplier.vue
// also withholds the actual page content until that client-side check
// resolves, so an unauthorized visitor never sees a flash of the
// (mock, but still real-looking) dashboard before being bounced.
const ALLOWED_ROLES = ['SUPPLIER', 'ADMIN']

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const authStore = useAuthStore()
  await authStore.initAuth()

  if (!authStore.user || !ALLOWED_ROLES.includes(authStore.user.role)) {
    return navigateTo('/login')
  }
})
