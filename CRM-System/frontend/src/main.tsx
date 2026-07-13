import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ThemeProvider from '@/providers/ThemeProvider'
import './index.css'
import './styles/shared.css'
import './styles/marketplace.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
