import { defineStore } from 'pinia';
import { API_LOGIN, API_LOGOUT, API_ME, API_REGISTER } from '../utils/api';

// Branches on the Axios error shape so the login form can show *why* it
// failed instead of one generic message for every case -- a wrong password
// (401, backend already sends a clean "Invalid email or password." we can
// use directly), a backend crash (500+, which may not have a clean JSON
// body to read a message from), and no response at all (network/CORS/the
// API being down, where err.response is undefined) are three different
// problems with three different fixes from the user's side.
function resolveLoginErrorMessage(err) {
  const { t } = useNuxtApp().$i18n;
  const status = err.response?.status;

  if (status === 401) {
    return err.response?.data?.message || t('errors.invalidCredentials');
  }
  if (status >= 500) {
    return t('errors.serverErrorRetry');
  }
  if (!err.response) {
    return t('errors.networkError');
  }
  return err.response?.data?.message || t('errors.loginFailed');
}

// Same branching idea as resolveLoginErrorMessage, but for POST /auth/register:
// 409 means the email is already taken (AuthService.register's ConflictException),
// 400 is a class-validator failure from the global ValidationPipe, whose `message`
// is an array of per-field strings rather than one string.
function resolveRegisterErrorMessage(err) {
  const { t } = useNuxtApp().$i18n;
  const status = err.response?.status;
  const data = err.response?.data;

  if (status === 409) {
    return data?.message || t('errors.emailTaken');
  }
  if (status === 400) {
    const msg = data?.message;
    return Array.isArray(msg) ? msg.join(' ') : msg || t('errors.validationError');
  }
  if (status >= 500) {
    return t('errors.serverErrorRetry');
  }
  if (!err.response) {
    return t('errors.networkError');
  }
  return data?.message || t('errors.registrationFailed');
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // Shape from POST /auth/login|register: SafeUser (id, email, firstName,
    // lastName, phone, role, ...). After a page reload it's re-hydrated via
    // GET /auth/me instead, which only returns the JWT payload
    // {sub, email, role} -- see initAuth() -- so firstName/lastName can be
    // absent until the user logs in again in this tab.
    user: null,
    isLoading: false,
    error: null,
    initialized: false
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),

    fullName: (state) => {
      if (!state.user) return '';
      const name = [state.user.firstName, state.user.lastName].filter(Boolean).join(' ');
      return name || state.user.email || '';
    }
  },

  actions: {
    async login(email, password) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.post(API_LOGIN, { email, password });

        // Backend sets the httpOnly auth cookie itself (Set-Cookie on this
        // response); nothing to store client-side for the token itself.
        this.user = data.user;
        return this.user;
      } catch (err) {
        this.error = resolveLoginErrorMessage(err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    // POST /auth/register also sets the auth cookie server-side (see
    // AuthController.register), but this deliberately does NOT populate
    // `this.user` -- the register page sends the user to /login afterward
    // (see app/pages/register.vue), and leaving the store's session state
    // untouched here keeps that navigation and the header's logged-out
    // state consistent until the user actually logs in.
    async register({ email, password, firstName, lastName }) {
      this.isLoading = true;
      this.error = null;

      try {
        const { $unibookingApi } = useNuxtApp();
        const { data } = await $unibookingApi.post(API_REGISTER, {
          email,
          password,
          firstName,
          lastName
        });
        return data.user;
      } catch (err) {
        this.error = resolveRegisterErrorMessage(err);
        throw err;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        const { $unibookingApi } = useNuxtApp();
        await $unibookingApi.post(API_LOGOUT);
      } catch {
        // Best effort -- clear local state regardless of whether the
        // network call succeeded, so the UI never gets stuck "logged in".
      } finally {
        this.user = null;
        navigateTo('/login');
      }
    },

    // ຮຽກໃຊ້ຕອນແອັບໂຫລດ (see plugins/auth.client.js): the auth cookie is
    // httpOnly so this Pinia store starts empty on every fresh page load
    // even when the browser still holds a valid session -- ask the server.
    //
    // Caches and returns the in-flight/settled promise (not just an
    // `initialized` boolean) so a second caller -- e.g. the admin layout's
    // role guard, which needs to know once `user` is actually populated,
    // not just that a fetch has started -- can `await` this and be sure
    // `this.user` is settled by the time it resolves, even though
    // plugins/auth.client.js already kicked this off, unawaited, earlier.
    initAuth() {
      if (!process.client) return Promise.resolve();
      if (this._authPromise) return this._authPromise;

      this.initialized = true;
      this._authPromise = (async () => {
        try {
          const { $unibookingApi } = useNuxtApp();
          const { data } = await $unibookingApi.get(API_ME);
          // GET /auth/me returns the raw JWT payload {sub, email, role} only.
          this.user = { id: data.sub, email: data.email, role: data.role };
        } catch {
          // No/expired cookie -- stay logged out, silently (this runs on
          // every page load for anonymous visitors too).
          this.user = null;
        }
      })();

      return this._authPromise;
    }
  }
});
