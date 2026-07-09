import { createContext, useEffect, useMemo, useState } from "react";

export const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => localStorage.getItem("color-mode") || "light");

  useEffect(() => {
    localStorage.setItem("color-mode", mode);
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      isDarkMode: mode === "dark",
      toggleMode: () => setMode((prev) => (prev === "dark" ? "light" : "dark")),
      setMode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={value}>{children}</ColorModeContext.Provider>
  );
};
