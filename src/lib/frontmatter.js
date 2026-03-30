import { parse } from 'yaml'

const FRONTMATTER_PATTERN = /^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/

export function parseMarkdownDocument(rawDocument) {
  const source = rawDocument || ''
  const match = source.match(FRONTMATTER_PATTERN)

  if (!match) {
    return {
      content: source.trim(),
      data: {},
    }
  }

  const [, frontmatter, content] = match

  return {
    content: content.trim(),
    data: parse(frontmatter) || {},
  }
}

export function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((entry) => String(entry).trim()).filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
  }

  return []
}

export function createExcerpt(markdown, maxLength = 160) {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]+\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (plainText.length <= maxLength) {
    return plainText
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`
}

export function parseFolderLabel(folderName) {
  const [ctfPart, ...challengeParts] = folderName.split('-')

  return {
    challengeName: prettifySegment(challengeParts.join(' ') || folderName),
    ctfName: prettifySegment(ctfPart || folderName),
  }
}

export function prettifySegment(value) {
  return value
    .split(/[_\s-]+/)
    .filter(Boolean)
    .map((segment) => {
      if (segment === segment.toUpperCase()) {
        return segment
      }

      return `${segment.charAt(0).toUpperCase()}${segment.slice(1)}`
    })
    .join(' ')
}

export function toTimestamp(dateValue) {
  if (!dateValue) {
    return 0
  }

  const timestamp = Date.parse(dateValue)
  return Number.isNaN(timestamp) ? 0 : timestamp
}

export function formatDate(dateValue) {
  if (!dateValue) {
    return 'Undated'
  }

  const date = new Date(dateValue)

  if (Number.isNaN(date.getTime())) {
    return String(dateValue)
  }

  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}
