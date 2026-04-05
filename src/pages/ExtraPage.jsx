import ContentCard from '../components/ContentCard.jsx'

function ExtraPage({ posts }) {
  return (
    <div className="page-stack">
      <section className="panel page-hero">
        <p className="eyebrow">Notes</p>
        <h1>Short references, checklists, and working notes.</h1>
        <p className="support-copy">
          Keep quick reminders here, such as deployment steps, lab notes, command snippets, and
          publishing workflows.
        </p>
      </section>

      <section className="card-grid">
        {posts.map((post) => (
          <ContentCard item={post} key={post.slug} to={`/notes/${post.slug}`} variant="note" />
        ))}
      </section>
    </div>
  )
}

export default ExtraPage
