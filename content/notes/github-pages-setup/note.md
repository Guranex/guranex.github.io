---
title: GitHub Pages Setup Checklist
date: 2026-04-06
tags:
  - deployment
  - github-pages
  - checklist
summary: The exact checklist I use to connect this repository to GitHub Pages.
---

# GitHub Pages setup checklist

Use this list when publishing the site for the first time.

## Repository

- Push the project to a GitHub repository
- If possible, name it `<your-username>.github.io`
- If you use another repo name, the workflow still handles the correct base path

## GitHub settings

Open:

```text
Repository -> Settings -> Pages
```

Then make sure the source is:

```text
GitHub Actions
```

## Workflow

The deploy workflow already exists in:

```text
.github/workflows/deploy.yml
```

It will run automatically on every push to `main`.

## After the first successful deployment

Your site URL will usually be one of these:

- `https://<your-username>.github.io/`
- `https://<your-username>.github.io/<repo-name>/`

## Common fix

If the homepage is blank, check:

- GitHub Pages source is set to `GitHub Actions`
- The latest workflow run completed successfully
- Your repository visibility and branch are correct
