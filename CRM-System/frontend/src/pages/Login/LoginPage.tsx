import { type FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/hooks/useAuth'
import LanguageToggle from '@/components/ui/LanguageToggle'
import './LoginPage.css'

export default function LoginPage() {
  const { t } = useTranslation()
  const { isAuthenticated, isLoading, error, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <div className="neon-root">
      {/* Background grid lines */}
      <div className="neon-grid" aria-hidden="true" />

      {/* Floating particles */}
      <div className="neon-particles" aria-hidden="true">
        <span /><span /><span /><span /><span /><span />
      </div>

      {/* Glowing circle */}
      <div className="neon-circle" aria-hidden="true">
        <div className="neon-circle-ring" />
        <div className="neon-circle-ring neon-circle-ring-2" />
      </div>

      {/* Login card */}
      <div className="neon-card">
        <div className="neon-card-inner">
          {/* Logo */}
          <div className="neon-logo-wrap">
            <img
              src="/dk-lao-logo.png"
              alt="DK Service"
              className="neon-logo"
              width={56}
              height={56}
            />
          </div>

          <h1 className="neon-title">{t('common.brandName')}</h1>
          <p className="neon-brand">{t('common.brandTagline')}</p>
          <p className="neon-subtitle">{t('login.subtitle')}</p>

          {error && <div className="neon-error">{error}</div>}

          <form onSubmit={handleSubmit} className="neon-form">
            <div className="neon-field">
              <label htmlFor="username">{t('login.username')}</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t('login.usernamePlaceholder')}
                autoComplete="username"
                autoFocus
                required
              />
            </div>

            <div className="neon-field">
              <label htmlFor="password">{t('login.password')}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('login.passwordPlaceholder')}
                autoComplete="current-password"
                required
              />
            </div>

            <label className="neon-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span>{t('login.rememberMe')}</span>
            </label>

            <button className="neon-btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="neon-btn-loading">
                  <span className="neon-spinner" />
                  {t('login.signingIn')}
                </span>
              ) : t('login.signIn')}
            </button>
          </form>

          <div className="neon-lang-toggle mt-6 mb-4">
            <LanguageToggle />
          </div>

          <p className="neon-footer">
            {t('login.footer')}
          </p>
        </div>
      </div>
    </div>
  )
}
