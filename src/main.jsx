import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { ColorProvider } from './context/ColorContext'
import { WindowProvider } from './context/WindowContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ColorProvider>
        <WindowProvider>
          <App />
        </WindowProvider>
      </ColorProvider>
    </ThemeProvider>
  </StrictMode>,
)
