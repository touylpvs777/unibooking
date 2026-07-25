import { useTranslation } from 'react-i18next'
import { useCustomUI, type FontSizeTier } from '@/config/customLanguageStore'

const FONT_SIZE_OPTIONS: { tier: FontSizeTier; label: string }[] = [
  { tier: 'small', label: 'S' },
  { tier: 'medium', label: 'M' },
  { tier: 'large', label: 'L' },
]

// Language now lives entirely in the topbar (LanguageToggle → i18next,
// global). This bar only controls font size, via customLanguageStore.ts.
export default function UICustomizerBar() {
  const { t } = useTranslation()
  const { fontSize, setFontSize } = useCustomUI()

  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-[#1c1c1e] px-3 py-2">
      <span className="text-xs font-medium text-gray-400">{t('dashboard.exec.customizer.fontSize')}</span>
      <div className="flex rounded-lg border border-white/10 bg-white/[0.03] p-0.5">
        {FONT_SIZE_OPTIONS.map((opt) => (
          <button
            key={opt.tier}
            type="button"
            onClick={() => setFontSize(opt.tier)}
            aria-pressed={fontSize === opt.tier}
            title={opt.tier}
            className={`w-7 rounded-md py-1 text-xs font-semibold transition-colors ${
              fontSize === opt.tier ? 'bg-violet-500/20 text-violet-300' : 'text-gray-400 hover:text-gray-100'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
