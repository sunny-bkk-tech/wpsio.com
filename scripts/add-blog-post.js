#!/usr/bin/env node
/*
Add a new blog post to the system.
Usage: node scripts/add-blog-post.js "Post Title" "category" "excerpt" "content-file.md"
*/

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateId(title) {
  return slugify(title);
}

function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes}分钟`;
}

function addBlogPost(title, category, excerpt, contentFile) {
  const id = generateId(title);
  const date = formatDate();
  
  // Read content from file
  let content = '';
  if (contentFile && fs.existsSync(contentFile)) {
    content = fs.readFileSync(contentFile, 'utf8');
  } else {
    content = `<p>${excerpt}</p>`;
  }
  
  const readTime = estimateReadTime(content);
  
  const post = {
    id,
    title,
    content,
    excerpt,
    date,
    category,
    readTime,
    author: 'WPS 团队',
    tags: [category, 'WPS Office', '办公软件']
  };
  
  // Update BlogPost.tsx
  const blogPostPath = path.resolve(process.cwd(), 'src/pages/BlogPost.tsx');
  let blogPostContent = fs.readFileSync(blogPostPath, 'utf8');
  
  // Find the blogPosts object and add new post
  const postEntry = `    '${id}': {
      id: '${id}',
      title: '${title}',
      excerpt: '${excerpt}',
      content: \`${content}\`,
      date: '${date}',
      category: '${category}',
      readTime: '${readTime}',
      author: 'WPS 团队',
      tags: [${post.tags.map(tag => `'${tag}'`).join(', ')}]
    },`;
  
  // Insert before the closing brace of blogPosts
  const insertPoint = blogPostContent.lastIndexOf('  };');
  if (insertPoint !== -1) {
    blogPostContent = blogPostContent.slice(0, insertPoint) + postEntry + '\n  ' + blogPostContent.slice(insertPoint);
    fs.writeFileSync(blogPostPath, blogPostContent, 'utf8');
  }
  
  // Update Blog.tsx
  const blogPath = path.resolve(process.cwd(), 'src/pages/Blog.tsx');
  let blogContent = fs.readFileSync(blogPath, 'utf8');
  
  const blogEntry = `    {
      id: '${id}',
      title: '${title}',
      excerpt: '${excerpt}',
      date: '${date}',
      category: '${category}',
      readTime: '${readTime}'
    },`;
  
  // Insert at the beginning of blogPosts array
  const blogInsertPoint = blogContent.indexOf('const blogPosts = [') + 'const blogPosts = ['.length;
  if (blogInsertPoint !== -1) {
    blogContent = blogContent.slice(0, blogInsertPoint) + '\n' + blogEntry + blogContent.slice(blogInsertPoint);
    fs.writeFileSync(blogPath, blogContent, 'utf8');
  }
  
  // Update sitemap.xml
  const sitemapPath = path.resolve(process.cwd(), 'public/sitemap.xml');
  let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  
  const sitemapEntry = `  <url>
    <loc>https://www.wpsio.com/blog/${id}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  
  // Insert before the closing </urlset>
  const sitemapInsertPoint = sitemapContent.lastIndexOf('</urlset>');
  if (sitemapInsertPoint !== -1) {
    sitemapContent = sitemapContent.slice(0, sitemapInsertPoint) + sitemapEntry + '\n' + sitemapContent.slice(sitemapInsertPoint);
    fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  }
  
  console.log(`✅ Blog post added: ${title}`);
  console.log(`📝 ID: ${id}`);
  console.log(`🔗 URL: https://www.wpsio.com/blog/${id}`);
  console.log(`📅 Date: ${date}`);
  console.log(`⏱️  Read time: ${readTime}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('Usage: node scripts/add-blog-post.js "Post Title" "category" "excerpt" [content-file.md]');
  console.log('');
  console.log('Examples:');
  console.log('  node scripts/add-blog-post.js "WPS Office 新功能" "新功能" "介绍最新功能"');
  console.log('  node scripts/add-blog-post.js "Excel 技巧" "教程" "Excel 使用技巧" "content.md"');
  process.exit(1);
}

const [title, category, excerpt, contentFile] = args;
addBlogPost(title, category, excerpt, contentFile);
