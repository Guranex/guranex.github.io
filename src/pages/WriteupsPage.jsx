import { useMemo, useState } from 'react'
import ContentCard from '../components/ContentCard.jsx'
import { postCategoryOptions, postTagOptions } from '../data/content.js'

function WriteupsPage({ posts }) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [sortOrder, setSortOrder] = useState('newest')

  const visiblePosts = useMemo(() => {
    const filtered = posts.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory
      const matchesTags =
        selectedTags.length === 0 || selectedTags.some((tag) => item.tags.includes(tag))

      return matchesCategory && matchesTags
    })

    return [...filtered].sort((left, right) => {
      if (sortOrder === 'oldest') {
        return left.sortTimestamp - right.sortTimestamp
      }

      return right.sortTimestamp - left.sortTimestamp
    })
  }, [posts, selectedCategory, selectedTags, sortOrder])

  const toggleTag = (tag) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    )
  }

  return (
    <div className="page-stack">
      <section className="panel page-hero">
        <p className="eyebrow">Posts</p>
        <h1>Long-form articles, writeups, and project breakdowns.</h1>
        <p className="support-copy">
          Add a new folder under <code>content/posts</code> with a <code>post.md</code> file
          and it will show up here on the next build.
        </p>
      </section>

      <section className="panel filter-panel">
        <div className="filter-controls">
          <label className="field-group">
            <span>Category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
            >
              <option value="all">All categories</option>
              {postCategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="field-group">
            <span>Sort</span>
            <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </label>
        </div>

        <div>
          <p className="field-label">Tag Filter</p>
          <div className="tag-filter-row">
            {postTagOptions.map((tag) => {
              const active = selectedTags.includes(tag)

              return (
                <button
                  className={`filter-chip${active ? ' filter-chip-active' : ''}`}
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  type="button"
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {visiblePosts.length ? (
        <section className="card-grid">
          {visiblePosts.map((item) => (
            <ContentCard item={item} key={item.slug} to={`/posts/${item.slug}`} />
          ))}
        </section>
      ) : (
        <section className="panel empty-state">
          <h2>No posts matched that filter set.</h2>
          <p>Try clearing a tag or switching the category dropdown back to all entries.</p>
        </section>
      )}
    </div>
  )
}

export default WriteupsPage
