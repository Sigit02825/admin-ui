import React, { useContext } from "react";
import { ColorModeContext } from "../../context/colorModeContext";

function Input(props) {
  const {
    id,
    icon = false,
    backgroundColor = false,
    border = "border-gray-03",
    ...rest
  } = props;
  const { isDarkMode } = useContext(ColorModeContext);

  return (
    <>
      <input
        className={`py-3 pl-4 text-sm rounded-md w-full border transition-colors
          ${isDarkMode ? "bg-[#1F2937] text-gray-100 placeholder:text-gray-400" : "text-gray-01"}
          ${border} focus:border-black focus:outline-none focus:ring-0 
          ${backgroundColor || ""}
        `}
        id={id}
        {...rest}
      />
    </>
  );
}

export default Input;
