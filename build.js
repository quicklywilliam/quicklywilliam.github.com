#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
import yaml from 'js-yaml';

marked.use(markedFootnote());
import { execSync } from 'child_process';

const POSTS_DIR = 'posts';
const PUBLIC_DIR = 'public';
const TEMPLATES_DIR = 'templates';
const STATIC_DIR = 'static';
const POSTS_PER_PAGE = 5;

// Configuration (can be moved to a config file later)
const SITE_TITLE = '❧ Slowlywilliam';
const SITE_DESCRIPTION = 'A place for my thoughts';
const SITE_URL = process.env.SITE_URL || 'https://slowlywilliam.com';

// Utility: Create slug from title
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Utility: Format date for RSS (RFC 822)
function formatRSSDate(date) {
  return new Date(date).toUTCString();
}

// Utility: Format date for display
function formatDisplayDate(date) {
  const d = new Date(date);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

// Parse markdown file with frontmatter
async function parsePost(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const match = content.match(/^---\n([\s\S]+?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error(`Invalid frontmatter in ${filePath}`);
  }

  const frontmatter = yaml.load(match[1]);
  const markdown = match[2];

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(`Missing required frontmatter (title, date) in ${filePath}`);
  }

  const html = marked(markdown).replace(
    /<h2 id="footnote-label"[^>]*>.*?<\/h2>/,
    '<hr>'
  );
  const slug = slugify(frontmatter.title);
  const date = new Date(frontmatter.date);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return {
    title: frontmatter.title,
    date: frontmatter.date,
    dateFormatted: formatDisplayDate(frontmatter.date),
    dateISO: date.toISOString().split('T')[0], // YYYY-MM-DD format
    dateObj: date,
    year,
    month,
    day,
    slug,
    html,
    url: `/${year}/${month}/${day}/${slug}.html`,
    fullUrl: `${SITE_URL}/${year}/${month}/${day}/${slug}.html`,
    filePath
  };
}

// Get list of changed files from git
function getChangedFiles() {
  try {
    const output = execSync('git diff --name-only HEAD^ HEAD', { encoding: 'utf-8' });
    const files = output.split('\n').filter(f => f.startsWith(POSTS_DIR) && f.endsWith('.md'));
    return files;
  } catch (error) {
    // If git diff fails (first commit, etc.), rebuild all
    console.log('Could not get git diff, rebuilding all posts');
    return null;
  }
}

// Load template
async function loadTemplate(name) {
  const filePath = path.join(TEMPLATES_DIR, name);
  return await fs.readFile(filePath, 'utf-8');
}

// Simple template replacement
function renderTemplate(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

// Generate individual post page
async function generatePost(post, layoutTemplate, postTemplate) {
  const postHtml = renderTemplate(postTemplate, {
    title: post.title,
    dateISO: post.dateISO,
    dateFormatted: post.dateFormatted,
    content: post.html
  });

  const fullHtml = renderTemplate(layoutTemplate, {
    title: `${post.title} - ${SITE_TITLE}`,
    content: postHtml
  });

  const outputDir = path.join(PUBLIC_DIR, String(post.year), post.month, post.day);
  await fs.mkdir(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${post.slug}.html`);
  await fs.writeFile(outputPath, fullHtml);

  console.log(`Generated: ${post.url}`);
}

// Generate homepage or pagination page
async function generateHomePage(posts, pageNum, totalPages, layoutTemplate, homeTemplate) {
  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, end);

  const postsHtml = pagePosts.map(post => {
    return `
    <article>
      <h2><a href="${post.url}">${post.title}</a></h2>
      <time datetime="${post.dateISO}">${post.dateFormatted}</time>
      ${post.html}
    </article>
    `;
  }).join('\n');

  let prevLink = '';
  let nextLink = '';

  if (pageNum > 1) {
    const prevUrl = pageNum === 2 ? '/' : `/page-${pageNum - 1}.html`;
    prevLink = `<a href="${prevUrl}">\u2190 Newer</a>`;
  }

  if (pageNum < totalPages) {
    const nextUrl = `/page-${pageNum + 1}.html`;
    nextLink = `<a href="${nextUrl}">Older \u2192</a>`;
  }

  const homeHtml = renderTemplate(homeTemplate, {
    posts: postsHtml,
    prevLink,
    nextLink
  });

  const fullHtml = renderTemplate(layoutTemplate, {
    title: pageNum === 1 ? SITE_TITLE : `${SITE_TITLE} - Page ${pageNum}`,
    content: homeHtml
  });

  const fileName = pageNum === 1 ? 'index.html' : `page-${pageNum}.html`;
  const outputPath = path.join(PUBLIC_DIR, fileName);
  await fs.writeFile(outputPath, fullHtml);

  console.log(`Generated: /${fileName}`);
}

// Generate RSS feed
async function generateRSS(posts) {
  const feedPosts = posts.slice(0, 20);

  const items = feedPosts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${post.fullUrl}</link>
      <description><![CDATA[${post.html}]]></description>
      <pubDate>${formatRSSDate(post.date)}</pubDate>
      <guid>${post.fullUrl}</guid>
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  const outputPath = path.join(PUBLIC_DIR, 'feed.xml');
  await fs.writeFile(outputPath, rss);

  console.log('Generated: /feed.xml');
}

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Copy static files
async function copyStatic() {
  try {
    const files = await fs.readdir(STATIC_DIR);
    for (const file of files) {
      const srcPath = path.join(STATIC_DIR, file);
      const destPath = path.join(PUBLIC_DIR, file);
      await fs.copyFile(srcPath, destPath);
      console.log(`Copied: ${file}`);
    }
  } catch (error) {
    console.log('No static files to copy');
  }
}

// Clean up empty directories
async function cleanEmptyDirs(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const fullPath = path.join(dir, entry.name);
        await cleanEmptyDirs(fullPath);

        // Check if directory is now empty
        const contents = await fs.readdir(fullPath);
        if (contents.length === 0) {
          await fs.rmdir(fullPath);
          console.log(`Removed empty directory: ${fullPath}`);
        }
      }
    }
  } catch (error) {
    // Directory doesn't exist or other error, ignore
  }
}

// Main build function
async function build() {
  console.log('Starting build...\n');

  // Ensure public directory exists
  await fs.mkdir(PUBLIC_DIR, { recursive: true });

  // Load templates
  const layoutTemplate = await loadTemplate('layout.html');
  const postTemplate = await loadTemplate('post.html');
  const homeTemplate = await loadTemplate('home.html');

  // Get all posts
  const postFiles = await fs.readdir(POSTS_DIR);
  const mdFiles = postFiles.filter(f => f.endsWith('.md'));

  if (mdFiles.length === 0) {
    console.log('No posts found!');
    return;
  }

  // Parse all posts
  const posts = [];
  for (const file of mdFiles) {
    const filePath = path.join(POSTS_DIR, file);
    try {
      const post = await parsePost(filePath);
      posts.push(post);
    } catch (error) {
      console.error(`Error parsing ${file}:`, error.message);
      process.exit(1);
    }
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => b.dateObj - a.dateObj);

  // Get changed files
  const changedFiles = getChangedFiles();

  // Generate individual post pages (only changed ones if possible)
  console.log('\nGenerating posts:');
  for (const post of posts) {
    if (!changedFiles || changedFiles.includes(post.filePath)) {
      await generatePost(post, layoutTemplate, postTemplate);
    }
  }

  // Always regenerate homepage, pagination, and RSS
  console.log('\nGenerating homepage and pagination:');
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  for (let i = 1; i <= totalPages; i++) {
    await generateHomePage(posts, i, totalPages, layoutTemplate, homeTemplate);
  }

  console.log('\nGenerating RSS feed:');
  await generateRSS(posts);

  console.log('\nCopying static files:');
  await copyStatic();

  console.log('\nCleaning up empty directories:');
  await cleanEmptyDirs(PUBLIC_DIR);

  console.log('\n✓ Build complete!');
}

// Run build
build().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});
