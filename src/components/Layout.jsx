import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import ScrollToTop from './ScrollToTop.jsx'

function Layout({ siteName }) {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <ScrollToTop />
      <Navbar siteName={siteName} />
      <main className="page-shell">
        <Outlet />
      </main>
      <footer className="site-footer">
        <span>{siteName} // security research notebook</span>
        <span></span>
      </footer>
    </div>
  )
}

export default Layout
