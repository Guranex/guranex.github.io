# W4RR1OR Personal Cybersecurity Site

A static-friendly Vite + React site designed for local development first and GitHub Pages deployment second.

## Local setup

```bash
npm install
npm run dev
```

The dev server starts locally with hot reload.

## Local production check

```bash
npm run build
npm run preview
```

`npm run build` outputs static files into `dist/`.

## Content editing

Edit home page content in `content/site.json`.

Add writeups in folders like:

```text
content/writeups/CTF_NAME-CHALLENGE_NAME/
|- writeup.md
|- image1.png
|- image2.png
```

Add extra posts in either:

```text
content/extra/POST_NAME/post.md
content/labs/POST_NAME/post.md
```

Markdown frontmatter is supported. Example fields:

```yaml
---
title: Cache Roulette
ctf: Cyber Matrix CTF 2026
date: 2026-02-21
tags:
  - Web Exploitation
  - Forensics
summary: Tracing inconsistent cache keys to leak an authenticated response.
---
```

Relative image paths inside markdown are supported, so `![diagram](./stack-map.svg)` works.

## GitHub Pages base path

For a project site, build with a repo-aware base path:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

If you deploy at the root domain, the default `/` base works as-is.

## GitHub Pages deployment

This repo can deploy with GitHub Actions using `.github/workflows/deploy.yml`.

1. Push the project to GitHub.
2. In the repository settings, open `Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` to trigger the workflow.

The workflow automatically uses `/` for `username.github.io` repositories and `/<repo-name>/` for project pages.
