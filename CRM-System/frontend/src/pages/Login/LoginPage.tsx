import { type FormEvent, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import './LoginPage.css'

export default function LoginPage() {
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

          <h1 className="neon-title">DK Service</h1>
          <p className="neon-brand">Enterprise Platform</p>
          <p className="neon-subtitle">Sign in to continue</p>

          {error && <div className="neon-error">{error}</div>}

          <form onSubmit={handleSubmit} className="neon-form">
            <div className="neon-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                autoComplete="username"
                autoFocus
                required
              />
            </div>

            <div className="neon-field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
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
              <span>Remember me</span>
            </label>

            <button className="neon-btn" type="submit" disabled={isLoading}>
              {isLoading ? (
                <span className="neon-btn-loading">
                  <span className="neon-spinner" />
                  Signing in…
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <p className="neon-footer">
            &copy; 2026 DK LAO Services. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
