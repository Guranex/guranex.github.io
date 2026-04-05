import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import ScrollToTop from './ScrollToTop.jsx'

function Layout({ siteConfig }) {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <ScrollToTop />
      <Navbar siteConfig={siteConfig} />
      <main className="page-shell">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>
          {siteConfig.name} // {siteConfig.tagline}
        </span>
        <span>Built with React, Markdown, and GitHub Pages</span>
      </footer>
    </div>
  )
}

export default Layout
