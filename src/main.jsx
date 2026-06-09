import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'
import { CounterContextProvider } from './context/counterContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeContextProvider>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </ThemeContextProvider>
  </StrictMode>
)