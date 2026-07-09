import React, { useContext } from 'react'
import Logo from '../Elements/Logo'
import { ThemeContext } from '../../context/themeContext'
import { ColorModeContext } from '../../context/colorModeContext'

function AuthLayout(props) {
    const { children } = props
    const { theme } = useContext(ThemeContext)
    const { isDarkMode } = useContext(ColorModeContext)
  return (
    <>
        <main 
         className={`min-h-screen flex justify-center items-center transition-colors ${theme?.name || ''} ${
           isDarkMode ? "bg-[#111827] text-gray-100" : "bg-special-mainBg text-gray-900"
         }`}>
            {/* container start */}
            <div className="w-full max-w-sm">
                <Logo />
                {children}
                {/* form sign in start */}
            </div>
            {/* container end */}
        </main>
    </>
  )
}

export default AuthLayout
