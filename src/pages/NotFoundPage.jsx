import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="panel empty-state">
      <p className="eyebrow">404</p>
      <h1>That page is outside this blog.</h1>
      <p>Use the navigation bar to head back to Home, Posts, or Notes.</p>
      <Link className="inline-cta" to="/">
        Return home
      </Link>
    </section>
  )
}

export default NotFoundPage
