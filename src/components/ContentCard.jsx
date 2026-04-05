import { Link } from 'react-router-dom'

function ContentCard({ item, to, variant = 'post' }) {
  const label = variant === 'post' ? `${item.category} // Article` : 'NOTES // Quick reference'
  const summary = variant === 'post' ? item.summary : item.description

  return (
    <Link className="content-card panel" to={to}>
      <p className="card-kicker">{label}</p>
      <h3>{item.title}</h3>
      <p className="card-copy">{summary}</p>
      <div className="card-chip-row">
        {item.tags.length ? (
          item.tags.map((tag) => (
            <span className="chip chip-muted" key={tag}>
              {tag}
            </span>
          ))
        ) : (
          <span className="chip chip-muted">No tags yet</span>
        )}
      </div>
      <div className="card-meta-row">
        <span>{item.displayDate}</span>
        <span>{item.folderName}</span>
      </div>
    </Link>
  )
}

export default ContentCard
