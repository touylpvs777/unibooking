import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en.json'
import lo from './lo.json'

export const SUPPORTED_LANGUAGES = ['en', 'lo'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const STORAGE_KEY = 'dk-lang'

function getInitialLanguage(): SupportedLanguage {
  const saved = localStorage.getItem(STORAGE_KEY)
  return SUPPORTED_LANGUAGES.includes(saved as SupportedLanguage) ? (saved as SupportedLanguage) : 'en'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    lo: { translation: lo },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
})

export default i18n
