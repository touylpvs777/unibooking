import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { I18nextProvider } from 'react-i18next'
import ThemeProvider from '@/providers/ThemeProvider'
import i18n from '@/i18n'
import './index.css'
import './styles/shared.css'
import './styles/marketplace.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </StrictMode>
)
