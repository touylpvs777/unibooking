import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type SupportedLanguage } from '@/i18n'
import './LanguageToggle.css'

const LABELS: Record<SupportedLanguage, string> = {
  en: 'EN',
  lo: 'ລາວ',
  th: 'ไทย',
}

export default function LanguageToggle() {
  const { i18n, t } = useTranslation()
  const current = i18n.language as SupportedLanguage

  return (
    <div className="lang-toggle" role="radiogroup" aria-label={t('common.language')}>
      {SUPPORTED_LANGUAGES.map((lng) => (
        <button
          key={lng}
          className={`lang-toggle-btn${current === lng ? ' active' : ''}`}
          onClick={() => i18n.changeLanguage(lng)}
          aria-label={LABELS[lng]}
          aria-checked={current === lng}
          role="radio"
          title={LABELS[lng]}
        >
          {LABELS[lng]}
        </button>
      ))}
    </div>
  )
}
