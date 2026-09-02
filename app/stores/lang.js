import { defineStore } from 'pinia';

// No @nuxtjs/i18n in this project yet -- this store is just the shared
// "which language is selected" bit, read by both navbars (the persistent
// site header in app/layouts/default.vue and the homepage's own floating
// hero navbar in app/pages/index.vue) so switching language in either one
// updates the other instead of each tracking its own, divergent local ref.
export const SUPPORTED_LANGUAGES = ['EN', 'Lao', 'Thai', 'Cha', 'Vt'];

export const useLangStore = defineStore('lang', {
  state: () => ({
    current: 'Lao'
  }),

  actions: {
    setLang(lang) {
      if (SUPPORTED_LANGUAGES.includes(lang)) this.current = lang;
    }
  }
});
