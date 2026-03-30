import { Link, useParams } from 'react-router-dom'
import MarkdownArticle from '../components/MarkdownArticle.jsx'

function WriteupDetailPage({ writeups }) {
  const { slug } = useParams()
  const writeup = writeups.find((item) => item.slug === slug)

  if (!writeup) {
    return (
      <section className="panel empty-state">
        <h1>Writeup not found</h1>
        <p>The requested folder was not part of the current build output.</p>
        <Link className="inline-cta" to="/writeups">
          Back to writeups
        </Link>
      </section>
    )
  }

  return (
    <div className="page-stack">
      <Link className="back-link" to="/writeups">
        {'<-'} Back to writeups
      </Link>
      <section className="panel detail-hero">
        <p className="eyebrow">{writeup.ctfName}</p>
        <h1>{writeup.challengeName}</h1>
        <p className="support-copy">{writeup.summary}</p>
        <div className="detail-meta-row">
          <span className="chip">{writeup.displayDate}</span>
          {writeup.tags.map((tag) => (
            <span className="chip chip-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>
      <MarkdownArticle baseDirectory={writeup.baseDirectory} content={writeup.content} />
    </div>
  )
}

export default WriteupDetailPage
