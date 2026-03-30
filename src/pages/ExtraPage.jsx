import ContentCard from '../components/ContentCard.jsx'

function ExtraPage({ posts }) {
  return (
    <div className="page-stack">
      <section className="panel page-hero">
        <p className="eyebrow">Extra</p>
        <h1>Research posts and side quest deep dives.</h1>
        <p className="support-copy">
         
        </p>
      </section>

      <section className="card-grid">
        {posts.map((post) => (
          <ContentCard item={post} key={post.slug} to={`/extra/${post.slug}`} variant="extra" />
        ))}
      </section>
    </div>
  )
}

export default ExtraPage
