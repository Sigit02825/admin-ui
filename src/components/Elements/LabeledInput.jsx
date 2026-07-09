import React, { useContext } from "react";
import Input from "./Input";
import { ColorModeContext } from "../../context/colorModeContext";

function LabeledInput(props) {
  const { label, id, ...rest } = props;
  const { isDarkMode } = useContext(ColorModeContext);

  return (
    <>
      <label
        htmlFor={id}
        className={`block text-sm mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-700"}`}
      >
        {label}
      </label>
      <Input id={id} {...rest} />
    </>
  );
}

export default LabeledInput;
