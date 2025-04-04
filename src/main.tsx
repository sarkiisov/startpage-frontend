import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App.tsx'
import './index.css'
import { ModalProvider, LinkProvider, SettingsProvider } from './components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModalProvider>
      <SettingsProvider>
        <LinkProvider>
          <App />
        </LinkProvider>
      </SettingsProvider>
    </ModalProvider>
  </StrictMode>
)
