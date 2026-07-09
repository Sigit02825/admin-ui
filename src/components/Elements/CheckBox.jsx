import React, { useContext } from 'react'
import { ColorModeContext } from "../../context/colorModeContext";

function CheckBox(props) {
    const { label, id, ...rest } = props
    const { isDarkMode } = useContext(ColorModeContext);
  return (
    <div className="flex items-center gap-2">
        <input
            type="checkbox"
            className="accent-primary w-4 h-4"
            id={id}
            {...rest}
        />
        <label 
            htmlFor={id}
            className={`text-sm ${isDarkMode ? "text-gray-200" : "text-gray-01"}`}
        >
            {label}
        </label>
    </div>
  )
}

export default CheckBox
