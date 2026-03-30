import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './theme-context.js'

const DEFAULT_THEME = 'dark'
const STORAGE_KEY = 'w4rr1or-theme'

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') {
      return DEFAULT_THEME
    }

    return window.localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => {
        setTheme((currentTheme) =>
          currentTheme === 'dark' ? 'light' : 'dark',
        )
      },
    }),
    [theme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
