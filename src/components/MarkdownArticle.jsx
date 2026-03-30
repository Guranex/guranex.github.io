import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { resolveContentAsset } from '../data/content.js'

function MarkdownArticle({ baseDirectory, content }) {
  return (
    <article className="markdown-body panel">
      <ReactMarkdown
        components={{
          a: ({ href, children, ...props }) => {
            const resolvedHref = resolveContentAsset(href, baseDirectory)
            const isExternal = /^(?:[a-z]+:)?\/\//i.test(resolvedHref)

            return (
              <a
                href={resolvedHref}
                rel={isExternal ? 'noreferrer' : undefined}
                target={isExternal ? '_blank' : undefined}
                {...props}
              >
                {children}
              </a>
            )
          },
          img: ({ alt, src, ...props }) => (
            <img
              alt={alt || ''}
              loading="lazy"
              src={resolveContentAsset(src, baseDirectory)}
              {...props}
            />
          ),
        }}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}

export default MarkdownArticle
