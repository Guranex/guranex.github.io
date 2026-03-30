import siteConfig from '../../content/site.json'
import {
  createExcerpt,
  formatDate,
  normalizeTags,
  parseFolderLabel,
  parseMarkdownDocument,
  prettifySegment,
  toTimestamp,
} from '../lib/frontmatter.js'

const WRITEUP_FILES = import.meta.glob('../../content/writeups/**/writeup.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

const EXTRA_FILES = {
  ...import.meta.glob('../../content/extra/**/post.md', {
    eager: true,
    import: 'default',
    query: '?raw',
  }),
  ...import.meta.glob('../../content/labs/**/post.md', {
    eager: true,
    import: 'default',
    query: '?raw',
  }),
}

const ASSET_FILES = import.meta.glob('../../content/**/*.{png,jpg,jpeg,gif,svg,webp,avif}', {
  eager: true,
  import: 'default',
})

const FIXED_WRITEUP_TAGS = [
  'Reverse Engineering',
  'Binary Exploitation',
  'Web Exploitation',
  'OSINT',
  'Forensics',
  'Cryptography',
]

const assetMap = Object.fromEntries(
  Object.entries(ASSET_FILES).map(([assetPath, resolvedUrl]) => [
    toContentRelativePath(assetPath),
    resolvedUrl,
  ]),
)

export { siteConfig }

export const writeups = Object.entries(WRITEUP_FILES)
  .map(([filePath, rawDocument]) => createWriteupEntry(filePath, rawDocument))
  .sort((left, right) => right.sortTimestamp - left.sortTimestamp)

export const extraPosts = Object.entries(EXTRA_FILES)
  .map(([filePath, rawDocument]) => createExtraEntry(filePath, rawDocument))
  .sort((left, right) => right.sortTimestamp - left.sortTimestamp)

export const writeupTagOptions = orderTags(
  Array.from(new Set([...FIXED_WRITEUP_TAGS, ...writeups.flatMap((item) => item.tags)])),
)

export const writeupCtfOptions = Array.from(
  new Set(writeups.map((item) => item.ctfName)),
).sort((left, right) => left.localeCompare(right))

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

function createWriteupEntry(filePath, rawDocument) {
  const folderName = filePath.split('/').at(-2)
  const { challengeName, ctfName } = parseFolderLabel(folderName)
  const { content, data } = parseMarkdownDocument(rawDocument)
  const baseDirectory = toBaseDirectory(filePath)
  const tags = normalizeTags(data.tags)
  const title = data.title || challengeName
  const date = data.date || ''

  return {
    baseDirectory,
    challengeName: data.challenge || title,
    content,
    ctfName: data.ctf || ctfName,
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

function createExtraEntry(filePath, rawDocument) {
  const folderName = filePath.split('/').at(-2)
  const { content, data } = parseMarkdownDocument(rawDocument)
  const title = data.title || prettifySegment(folderName)
  const date = data.date || ''
  const collection = filePath.includes('/labs/') ? 'labs' : 'extra'

  return {
    baseDirectory: toBaseDirectory(filePath),
    collection,
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

function orderTags(tags) {
  const priority = new Map(FIXED_WRITEUP_TAGS.map((tag, index) => [tag, index]))

  return [...tags].sort((left, right) => {
    const leftPriority = priority.has(left) ? priority.get(left) : Number.POSITIVE_INFINITY
    const rightPriority = priority.has(right) ? priority.get(right) : Number.POSITIVE_INFINITY

    if (leftPriority !== rightPriority) {
      return leftPriority - rightPriority
    }

    return left.localeCompare(right)
  })
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
