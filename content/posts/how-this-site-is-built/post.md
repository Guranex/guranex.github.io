---
title: How This Site Is Built
category: Development
date: 2026-04-06
tags:
  - react
  - vite
  - markdown
summary: A quick architecture note for the blog so future edits stay straightforward.
---

# How this site is built

This blog uses a very small stack:

- `Vite` for local development and building static files
- `React` for the UI
- `Markdown` files for content
- `GitHub Actions` to publish to `GitHub Pages`

## Content structure

Posts live here:

```text
content/posts/<slug>/post.md
```

Notes live here:

```text
content/notes/<slug>/note.md
```

The homepage profile and links live here:

```text
content/site.json
```

## Why this setup works well

The code stays separate from the content. That means I can focus on writing instead of editing lots of components every time I want to publish something new.

## Local commands

```bash
npm install
npm run dev
npm run build
```

## Deployment flow

Every push to the `main` branch triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`.

That workflow:

1. Installs dependencies
2. Builds the site
3. Uploads the static output
4. Deploys it to GitHub Pages

This keeps the publishing workflow simple and repeatable.
