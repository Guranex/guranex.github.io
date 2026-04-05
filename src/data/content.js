import siteConfig from '../../content/site.json'
import {
  createExcerpt,
  formatDate,
  normalizeTags,
  parseMarkdownDocument,
  prettifySegment,
  toTimestamp,
} from '../lib/frontmatter.js'

const POST_FILES = import.meta.glob('../../content/posts/**/post.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const NOTE_FILES = import.meta.glob('../../content/notes/**/note.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const ASSET_FILES = {
  ...import.meta.glob('../../content/posts/**/*.{png,jpg,jpeg,gif,svg,webp,avif}', {
    eager: true,
    import: 'default',
  }),
  ...import.meta.glob('../../content/notes/**/*.{png,jpg,jpeg,gif,svg,webp,avif}', {
    eager: true,
    import: 'default',
  }),
}

const assetMap = Object.fromEntries(
  Object.entries(ASSET_FILES).map(([assetPath, resolvedUrl]) => [
    toContentRelativePath(assetPath),
    resolvedUrl,
  ]),
)

export { siteConfig }

export const posts = Object.entries(POST_FILES)
  .map(([filePath, rawDocument]) => createPostEntry(filePath, rawDocument))
  .sort((left, right) => right.sortTimestamp - left.sortTimestamp)

export const notes = Object.entries(NOTE_FILES)
  .map(([filePath, rawDocument]) => createNoteEntry(filePath, rawDocument))
  .sort((left, right) => right.sortTimestamp - left.sortTimestamp)

export const postTagOptions = orderStrings(Array.from(new Set(posts.flatMap((item) => item.tags))))

export const postCategoryOptions = orderStrings(
  Array.from(new Set(posts.map((item) => item.category))),
)

export function resolveContentAsset(sourcePath, baseDirectory) {
  if (!sourcePath) {
    return ''
  }

  const trimmedPath = sourcePath.trim()

  if (
    /^(?:[a-z]+:)?\/\//i.test(trimmedPath) ||
    /^(?:mailto:|tel:|data:|#)/i.test(trimmedPath)
  ) {
    return trimmedPath
  }

  const candidate = trimmedPath.startsWith('/')
    ? normalizePath(trimmedPath.slice(1))
    : normalizePath(`${baseDirectory}/${trimmedPath}`)

  if (assetMap[candidate]) {
    return assetMap[candidate]
  }

  if (assetMap[`content/${candidate}`]) {
    return assetMap[`content/${candidate}`]
  }

  return trimmedPath
}

function createPostEntry(filePath, rawDocument) {
  const folderName = filePath.split('/').at(-2)
  const { content, data } = parseMarkdownDocument(rawDocument)
  const baseDirectory = toBaseDirectory(filePath)
  const title = data.title || prettifySegment(folderName)
  const category = data.category || 'General'
  const tags = normalizeTags(data.tags)
  const date = data.date || ''

  return {
    baseDirectory,
    category,
    content,
    date,
    displayDate: formatDate(date),
    folderName,
    slug: folderName,
    sortTimestamp: toTimestamp(date),
    summary: data.summary || createExcerpt(content),
    tags,
    title,
  }
}

function createNoteEntry(filePath, rawDocument) {
  const folderName = filePath.split('/').at(-2)
  const { content, data } = parseMarkdownDocument(rawDocument)
  const title = data.title || prettifySegment(folderName)
  const date = data.date || ''

  return {
    baseDirectory: toBaseDirectory(filePath),
    collection: 'notes',
    content,
    date,
    description: data.description || data.summary || createExcerpt(content),
    displayDate: formatDate(date),
    folderName,
    slug: folderName,
    sortTimestamp: toTimestamp(date),
    tags: normalizeTags(data.tags),
    title,
  }
}

function orderStrings(values) {
  return [...values].sort((left, right) => left.localeCompare(right))
}

function toBaseDirectory(filePath) {
  return toContentRelativePath(filePath).split('/').slice(0, -1).join('/')
}

function toContentRelativePath(filePath) {
  return filePath.replace(/^(?:\.\.\/)+/, '')
}

function normalizePath(inputPath) {
  const segments = inputPath.split('/')
  const normalizedSegments = []

  for (const segment of segments) {
    if (!segment || segment === '.') {
      continue
    }

    if (segment === '..') {
      normalizedSegments.pop()
      continue
    }

    normalizedSegments.push(segment)
  }

  return normalizedSegments.join('/')
}
