// context/ThemeContext.tsx
import { useState,type ReactNode } from "react";
import { ThemeContext } from "./sharedTheme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === "dark" ? "bg-[#0f0f1a] text-gray-100" : "bg-[#fffaf6] text-gray-900"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};