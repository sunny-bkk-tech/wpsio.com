# Blog System Documentation

## Overview

The blog system uses a single JSON datastore at `public/blog-posts.json`. Posts are added via a CLI that takes a simple JSON input, then auto-computes metadata and writes/updates the datastore. React pages load from this datastore.

## How It Works

### 1) Prepare a post JSON (input)

Minimum input fields:

```json
{
  "title": "WPS Office 2025 新功能预览",
  "content": "Your blog content...",
  "category": "教程",
  "tags": ["WPS Office", "办公软件"],
  "slug": "optional-custom-slug",
  "author": "WPS 团队"
}
```

Notes:
- If `slug` is omitted, an id is generated from `title` (CJK-safe).
- `excerpt`, `date`, `readTime`, `wordCount`, `lastModified` are auto-generated.

### 2) Post it to the datastore

```bash
yarn blog:post path/to/your-post.json
```

What happens:
- Reads `public/blog-posts.json` (creates one if missing)
- Generates a full `BlogPostData` object
- Deduplicates and writes back (see Deduplication below)

### 3) React components that consume the data

- **`src/pages/Blog.tsx`**: Lists all posts
- **`src/pages/BlogPost.tsx`**: Renders a single post by id
- **`src/utils/blogData.ts`**: Loads and normalizes posts for the app

## Deduplication

To avoid duplicate posts in the datastore and UI:

- **Write-time (CLI)**: `scripts/post-from-json.ts`
  - Checks for an existing post with the same `id` or the same normalized `title` (CJK-aware normalization)
  - If found, it updates that post instead of adding a new one

- **Read-time (Loader)**: `src/utils/blogData.ts`
  - Normalizes titles and keeps only the latest post per title (by `date`/`lastModified`)
  - Returns a clean `id → post` map to the app

This two-layer approach prevents duplicates even if older data files contain repeated entries.

## File Structure

```
src/
├── types/
│   └── blog.ts              # BlogPostData interface
├── utils/
│   └── blogData.ts          # Fetch + read-time dedupe
├── pages/
│   ├── Blog.tsx             # Blog list
│   └── BlogPost.tsx         # Post detail

scripts/
└── post-from-json.ts        # CLI to add/update posts

public/
└── blog-posts.json          # Single datastore consumed by the app
```

## Blog Post Fields (stored form)

- `id`: From `slug` or generated from `title`
- `title`: Post title
- `content`: HTML string (the CLI wraps plain text in `<p>`)
- `excerpt`: First 100 chars of content
- `date`: YYYY-MM-DD (creation date)
- `category`: Defaults to "教程" if not provided
- `readTime`: Auto-calculated (≈200 wpm)
- `author`: Defaults to "WPS 团队" if not provided
- `tags`: Array of strings
- `lastModified`: Set to the same date on creation
- `wordCount`: Estimated from `content`
- `relatedPosts`: Optional array of post ids

## Commands

- `yarn blog:post <path-to-json>` → Create or update a post
- `yarn serp:manual` → Generate manual SERP links (report saved under `reports/serp/`)

## Tips

- Prefer unique titles or provide a custom `slug` to control the `id`.
- Re-running `blog:post` with the same title/slug will update the existing post.
- You can link related posts by ids via `relatedPosts`.

## Future Enhancements

- Optional `--no-overwrite` flag to fail on duplicates instead of updating
- Featured image and cover metadata
- Category filtering and search
- Rich text editor integration
