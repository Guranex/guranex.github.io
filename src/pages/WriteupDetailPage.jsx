import { Link, useParams } from 'react-router-dom'
import MarkdownArticle from '../components/MarkdownArticle.jsx'

function WriteupDetailPage({ posts }) {
  const { slug } = useParams()
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    return (
      <section className="panel empty-state">
        <h1>Post not found</h1>
        <p>The requested article was not part of the current build output.</p>
        <Link className="inline-cta" to="/posts">
          Back to posts
        </Link>
      </section>
    )
  }

  return (
    <div className="page-stack">
      <Link className="back-link" to="/posts">
        {'<-'} Back to posts
      </Link>
      <section className="panel detail-hero">
        <p className="eyebrow">{post.category}</p>
        <h1>{post.title}</h1>
        <p className="support-copy">{post.summary}</p>
        <div className="detail-meta-row">
          <span className="chip">{post.displayDate}</span>
          {post.tags.map((tag) => (
            <span className="chip chip-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>
      <MarkdownArticle baseDirectory={post.baseDirectory} content={post.content} />
    </div>
  )
}

export default WriteupDetailPage
