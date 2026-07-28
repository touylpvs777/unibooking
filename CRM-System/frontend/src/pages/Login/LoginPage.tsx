import { type CSSProperties, type FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import LanguageToggle from '@/components/ui/LanguageToggle'

/** Small reusable headlight: a glowing bulb plus a light-cone beam shining
 * toward the login form. Built as absolutely-positioned sibling elements
 * (not literal ::before/::after) — this project's Tailwind/PostCSS build
 * has a reproducible bug where `content-['']`/`[content:'']` pseudo-element
 * utilities resolve to `content: none` regardless of syntax, so real
 * elements are used to get the identical visual effect reliably. Pure
 * Tailwind classes throughout — no raw CSS. */
function Headlight({ on, style }: { on: boolean; style: CSSProperties }) {
  return (
    <div aria-hidden="true" style={style} className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2">
      {/* Light-beam cone (linear-gradient wedge, clipped to a triangle, shining right toward the form) */}
      <div
        className={[
          'absolute left-full top-1/2 h-[260px] w-[480px] -translate-y-1/2 origin-left pointer-events-none',
          '[clip-path:polygon(0_32%,100%_2%,100%_98%,0_68%)]',
          'bg-[linear-gradient(90deg,rgba(191,219,254,0.85),rgba(96,165,250,0.35)_45%,rgba(96,165,250,0.08)_75%,transparent_92%)]',
          '[mix-blend-mode:screen] blur-[1px] transition-opacity duration-700',
          on ? 'opacity-100 animate-[beam-on_0.8s_ease-out_forwards]' : 'opacity-0',
        ].join(' ')}
      />
      {/* Bulb glow (soft halo behind the bulb) */}
      <div
        className={[
          'absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-500',
          on ? 'opacity-100 shadow-[0_0_18px_6px_rgba(96,165,250,0.85)]' : 'opacity-0',
        ].join(' ')}
      />
      {/* Bulb */}
      <div
        className={[
          'absolute inset-0 rounded-full transition-colors duration-500',
          on ? 'bg-blue-200 animate-[headlight-on_0.7s_ease-out_forwards]' : 'bg-blue-950/60',
        ].join(' ')}
      />
    </div>
  )
}

export default function LoginPage() {
  const { t } = useTranslation()
  const { isAuthenticated, isLoading, error, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [isLit, setIsLit] = useState(false)

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login({ username, password })
  }

  const toggleLights = () => setIsLit((prev) => !prev)

  const inputClass =
    'w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:bg-white/[0.08]'

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950 p-6">
      {/* Ambient wash that intensifies once the headlights are switched on */}
      <div
        aria-hidden="true"
        className={[
          'pointer-events-none absolute inset-0 transition-opacity duration-700',
          isLit ? 'opacity-100' : 'opacity-0',
          'bg-[radial-gradient(ellipse_900px_600px_at_18%_55%,rgba(59,130,246,0.14),transparent_70%)]',
        ].join(' ')}
      />
      {/* Faint floor grid for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:48px_48px]"
      />

      <div className="relative z-10 grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
        {/* ── Forklift illustration ─────────────────────────────────────── */}
        <div className="relative hidden items-center justify-center lg:flex">
          <button
            type="button"
            onClick={toggleLights}
            aria-pressed={isLit}
            aria-label={t('login.powerSwitch')}
            className="relative aspect-[4/3] w-full max-w-lg cursor-pointer appearance-none rounded-2xl border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60"
          >
            <svg
              viewBox="0 0 400 300"
              className="absolute inset-0 h-full w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              aria-hidden="true"
            >
              {/* Ground shadow */}
              <ellipse cx="170" cy="270" rx="150" ry="12" fill="black" opacity="0.35" />

              {/* Counterweight (rear) */}
              <rect x="35" y="150" width="35" height="65" rx="6" fill="#334155" />

              {/* Overhead guard frame */}
              <path
                d="M95 165 L95 65 M175 165 L175 65 M95 65 L175 65"
                stroke="#475569"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
              {/* Seat */}
              <rect x="110" y="140" width="40" height="26" rx="5" fill="#1e293b" />

              {/* Main chassis */}
              <rect x="60" y="170" width="200" height="55" rx="10" fill="#2563eb" />
              <rect x="60" y="170" width="200" height="16" rx="8" fill="#60a5fa" />

              {/* Mast */}
              <rect x="248" y="45" width="10" height="205" rx="3" fill="#334155" />
              <rect x="270" y="45" width="10" height="205" rx="3" fill="#334155" />
              <rect x="248" y="120" width="32" height="10" rx="2" fill="#1e293b" />

              {/* Forks */}
              <rect x="255" y="232" width="90" height="9" rx="3" fill="#94a3b8" />
              <rect x="255" y="248" width="90" height="9" rx="3" fill="#94a3b8" />

              {/* Wheels */}
              <circle cx="110" cy="250" r="26" fill="#0f172a" stroke="#334155" strokeWidth="6" />
              <circle cx="110" cy="250" r="8" fill="#475569" />
              <circle cx="222" cy="250" r="26" fill="#0f172a" stroke="#334155" strokeWidth="6" />
              <circle cx="222" cy="250" r="8" fill="#475569" />

              {/* Headlight housings (visual anchor for the HTML headlight overlays below) */}
              <circle cx="244" cy="178" r="9" fill="#1e293b" />
              <circle cx="244" cy="198" r="9" fill="#1e293b" />
            </svg>

            {/* Interactive headlights, overlaid on top of the SVG at matching coordinates */}
            <Headlight on={isLit} style={{ left: '61%', top: '59.5%' }} />
            <Headlight on={isLit} style={{ left: '61%', top: '66%' }} />
          </button>
        </div>

        {/* ── Login form ────────────────────────────────────────────────── */}
        <div className="mx-auto w-full max-w-md lg:mx-0">
          {/* Power switch: the trigger that turns on the headlights and reveals the form below */}
          <button
            type="button"
            onClick={toggleLights}
            aria-pressed={isLit}
            aria-label={t('login.powerSwitch')}
            className="mx-auto mb-5 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition-all duration-300 hover:border-blue-400/40 hover:bg-white/10 lg:mx-0"
          >
            <span
              className={[
                'h-2.5 w-2.5 rounded-full transition-all duration-500',
                isLit ? 'bg-blue-400 shadow-[0_0_10px_3px_rgba(96,165,250,0.85)]' : 'bg-slate-600',
              ].join(' ')}
            />
            {t('login.powerSwitch')}
          </button>

          <div
            className={[
              'rounded-3xl border p-8 shadow-2xl backdrop-blur-xl transition-all duration-700',
              'bg-white/[0.06]',
              isLit
                ? 'pointer-events-auto translate-y-0 opacity-100 border-blue-400/40 shadow-[0_0_60px_-10px_rgba(59,130,246,0.35)]'
                : 'pointer-events-none translate-y-4 opacity-0 border-white/10',
            ].join(' ')}
          >
            <div className="mb-6 flex flex-col items-center text-center">
              <div
                className={[
                  'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-500',
                  isLit ? 'border-blue-400/50 shadow-[0_0_24px_-2px_rgba(59,130,246,0.5)]' : 'border-white/10',
                ].join(' ')}
              >
                <img src="/dk-lao-logo.png" alt="DK Service" width={40} height={40} className="rounded-lg" />
              </div>
              <h1 className="text-xl font-bold text-white">{t('common.brandName')}</h1>
              <p className="text-xs uppercase tracking-wider text-blue-400/80">{t('common.brandTagline')}</p>
              <p className="mt-2 text-sm text-slate-400">{t('login.subtitle')}</p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="username" className="text-xs font-medium text-slate-300">
                  {t('login.username')}
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t('login.usernamePlaceholder')}
                  autoComplete="username"
                  autoFocus
                  required
                  className={`${inputClass} border-white/10 focus:!border-blue-400/50 focus:!shadow-[0_0_0_3px_rgba(59,130,246,0.18)]`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-xs font-medium text-slate-300">
                  {t('login.password')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder')}
                  autoComplete="current-password"
                  required
                  className={`${inputClass} border-white/10 focus:!border-blue-400/70 focus:!shadow-[0_0_0_3px_rgba(59,130,246,0.28),0_0_20px_-4px_rgba(59,130,246,0.6)]`}
                />
              </div>

              <label className="flex select-none items-center gap-2 text-xs text-slate-400">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-3.5 w-3.5 accent-blue-400"
                />
                <span>{t('login.rememberMe')}</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {t('login.signingIn')}
                  </>
                ) : (
                  t('login.signIn')
                )}
              </button>
            </form>

            <div className="mb-4 mt-6 flex justify-center">
              <LanguageToggle />
            </div>

            <p className="text-center text-xs text-slate-500">{t('login.footer')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
