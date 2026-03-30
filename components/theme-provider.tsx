"use client";

import * as React from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get initial theme - check if script already applied it
  const getInitialTheme = (): Theme => {
    if (typeof window === "undefined") return "light";
    
    // Check if theme was already applied by script
    const hasDarkClass = document.documentElement.classList.contains('dark');
    const dataTheme = document.documentElement.getAttribute('data-theme');
    
    if (hasDarkClass || dataTheme) {
      // Script already applied theme, use it
      return hasDarkClass ? 'dark' : 'light';
    }
    
    // Fallback to stored or system theme
    const stored = getStoredTheme();
    if (stored) return stored;
    
    return getSystemTheme();
  };

  const [theme, setThemeState] = React.useState<Theme>(getInitialTheme);

  // Apply theme immediately on mount (in case script didn't run)
  React.useEffect(() => {
    applyThemeClass(theme);
  }, [theme]);

  // Listen for system theme changes (only if no manual theme set)
  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      const stored = getStoredTheme();
      if (!stored) {
        // Only change theme if user hasn't manually set one
        setThemeState(mediaQuery.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = React.useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyThemeClass(nextTheme); // Apply immediately
    try {
      window.localStorage.setItem("theme", nextTheme);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
