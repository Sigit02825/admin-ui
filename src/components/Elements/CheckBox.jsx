import React from 'react'

function CheckBox(props) {
    const { label, id, ...rest } = props
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
            className="text-sm text-gray-01"
        >
            {label}
        </label>
    </div>
  )
}

export default CheckBox