# Slowlywilliam

My minimalist static blog that publishes markdown files to GitHub Pages.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Create a blog post

Create a new `.md` file in the `posts/` folder:

```markdown
---
title: My First Post
date: 2026-02-09
---

Your content here...
```

### 3. Start development server

```bash
npm run dev
```

This will:
- Watch for changes in posts, templates, static files, and build.js
- Automatically rebuild when you save changes
- Serve your blog at `http://localhost:8000` with live reload
- Auto-refresh your browser when files change

Just edit your markdown files, templates, or CSS and see changes instantly!

**Or build manually:**

```bash
npm run build
```

The generated site will be in the `public/` folder.

### 5. Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Set Source to "GitHub Actions"
4. Push to the `main` branch
5. Your blog will be live at `https://yourusername.github.io/yourrepo`

## Available Commands

- `npm run dev` - Start development server with auto-rebuild and live reload
- `npm run build` - Build the site once
- `npm run watch` - Watch for changes and rebuild (without server)
- `npm run serve` - Serve the public folder (without watching)

## Configuration

Edit these values in `build.js`:

- `SITE_TITLE` - Your blog title
- `SITE_DESCRIPTION` - Blog description (for RSS)
- `SITE_URL` - Your GitHub Pages URL (auto-set in GitHub Actions)
- `POSTS_PER_PAGE` - Number of posts per page (default: 5)

Edit the blog header in `templates/layout.html`:

```html
<h1><a href="/">Your Blog</a></h1>
```

## URLs

- Homepage: `/`
- Post pages: `/YYYY/MM/DD/post-title.html`
- Pagination: `/page-2.html`, `/page-3.html`, etc.
- RSS feed: `/feed.xml`

## License

MIT
