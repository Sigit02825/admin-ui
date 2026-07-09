import React, { useContext } from 'react'
import { ColorModeContext } from "../../context/colorModeContext";

function Button(props) {
    const { children, type = "submit", variant = "primary" } = props
    const { isDarkMode } = useContext(ColorModeContext);
    
    const baseClasses = "h-12 rounded-md text-sm w-full cursor-pointer hover:scale-105"
    const variantClasses = {
        primary: "bg-primary text-white",
        secondary: isDarkMode ? "bg-[#1F2937] text-gray-100 border border-gray-600" : "bg-gray-05 text-gray-02",
    }
    const finalClasses = `${baseClasses} ${variantClasses[variant] || variantClasses.primary}`
    
    return (
    <div>
        <button
            className={finalClasses}
            type={type}
            >
            {children}
        </button>
    </div>
  )
}

export default Button
