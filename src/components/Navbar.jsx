import { NavLink } from 'react-router-dom'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Writeups', to: '/writeups' },
  { label: 'Extra', to: '/extra' },
]

function Navbar({ siteName }) {
  return (
    <header className="site-header">
      <div className="brand-lockup">
        <span className="brand-glyph">[::]</span>
        <div>
          <p className="brand-name">{siteName}</p>
          <p className="brand-subtitle">Cybersecurity Enthusiast</p>
        </div>
      </div>
      <nav className="nav-links" aria-label="Primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            className={({ isActive }) =>
              `nav-link${isActive ? ' nav-link-active' : ''}`
            }
            end={link.to === '/'}
            to={link.to}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <ThemeToggle />
    </header>
  )
}

export default Navbar
