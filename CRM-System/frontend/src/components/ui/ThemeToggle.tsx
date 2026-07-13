import { Sun, Moon, Monitor } from 'lucide-react'
import { useThemeStore, type ThemeMode } from '@/store/themeStore'
import './ThemeToggle.css'

const OPTIONS: { mode: ThemeMode; icon: React.ElementType; label: string }[] = [
  { mode: 'light', icon: Sun, label: 'Light' },
  { mode: 'dark', icon: Moon, label: 'Dark' },
  { mode: 'system', icon: Monitor, label: 'System' },
]

export default function ThemeToggle() {
  const mode = useThemeStore((s) => s.mode)
  const setMode = useThemeStore((s) => s.setMode)

  return (
    <div className="theme-toggle" role="radiogroup" aria-label="Theme">
      {OPTIONS.map(({ mode: m, icon: Icon, label }) => (
        <button
          key={m}
          className={`theme-toggle-btn${mode === m ? ' active' : ''}`}
          onClick={() => setMode(m)}
          aria-label={label}
          aria-checked={mode === m}
          role="radio"
          title={label}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  )
}
