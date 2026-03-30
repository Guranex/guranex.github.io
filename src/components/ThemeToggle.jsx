import { useTheme } from '../context/useTheme.jsx'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <span className={`toggle-thumb${isDark ? ' toggle-thumb-dark' : ''}`} />
      <span className="toggle-label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  )
}

export default ThemeToggle
