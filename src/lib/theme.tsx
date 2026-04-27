// ============================================
// OpenPortfolio - Theme Provider
// Light/Dark/System theme support
// ============================================

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'openportfolio-theme';

/**
 * Get system preference
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Resolve theme based on setting
 */
function resolveTheme(theme: Theme): ResolvedTheme {
  return theme === 'system' ? getSystemTheme() : theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(STORAGE_KEY) as Theme) || 'system';
  });

  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(theme));

  // Update resolved theme and apply to document
  const applyTheme = useCallback((newResolved: ResolvedTheme) => {
    setResolvedTheme(newResolved);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newResolved);
    document.documentElement.style.colorScheme = newResolved;
  }, []);

  // Handle theme change
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme);
    applyTheme(resolveTheme(newTheme));
  }, [applyTheme]);

  // Toggle between light/dark (cycles through)
  const toggleTheme = useCallback(() => {
    const nextTheme: Record<ResolvedTheme, ResolvedTheme> = { light: 'dark', dark: 'light' };
    const newResolved = nextTheme[resolvedTheme];
    setTheme(newResolved);
  }, [resolvedTheme]);

  // Initialize on mount
  useEffect(() => {
    applyTheme(resolveTheme(theme));

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme(getSystemTheme());
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
