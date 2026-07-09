import React, { useContext } from "react"; 
import { ColorModeContext } from "../../context/colorModeContext";

function Card(props) {
  const { title, link = false, desc } = props;
  const { isDarkMode } = useContext(ColorModeContext);

  return (
    <div className="h-full flex flex-col">
      <div className={`flex justify-between items-center mb-2 ${isDarkMode ? "text-gray-200" : "text-gray-02"}`}>
        <div className="text-2xl">{title}</div> 
        {link && <div className="text-xs">View All</div>}
      </div>
      <div
        className={`flex-1 rounded-lg px-6 py-5 shadow-xl transition-colors ${
          isDarkMode ? "bg-[#1F2937] text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {desc}
      </div>
    </div>
  );
}

export default Card;
