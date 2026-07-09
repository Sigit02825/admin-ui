import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeContextProvider } from './context/themeContext.jsx'
import { ColorModeProvider } from './context/colorModeContext.jsx'
import { CounterContextProvider } from './context/counterContext.jsx'
import Form from "./latihan/Form.jsx";
import { AuthContextProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ColorModeProvider>
        <ThemeContextProvider>
          <CounterContextProvider>
            <App />
          </CounterContextProvider>
        </ThemeContextProvider>
      </ColorModeProvider>
    </AuthContextProvider>
  </StrictMode>
)
