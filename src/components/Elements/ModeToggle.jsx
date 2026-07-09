import { useContext } from "react";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { ColorModeContext } from "../../context/colorModeContext";

function ModeToggle() {
  const { isDarkMode, toggleMode } = useContext(ColorModeContext);

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={isDarkMode ? "Aktifkan light mode" : "Aktifkan dark mode"}
      className={`flex h-9 w-9 items-center justify-center transition ${
        isDarkMode ? "text-white" : "text-gray-600"
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center">
        {isDarkMode ? (
          <LightModeOutlinedIcon fontSize="small" />
        ) : (
          <DarkModeOutlinedIcon fontSize="small" />
        )}
      </span>
    </button>
  );
}

export default ModeToggle;
