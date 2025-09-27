import fs from 'fs';
import path from 'path';

interface BlogPostInput {
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  slug?: string;
  author?: string;
}

interface BlogPostData {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  tags: string[];
  lastModified?: string;
  wordCount?: number;
  relatedPosts?: string[];
}

const generateBlogPostFromInput = (input: BlogPostInput): BlogPostData => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  
  // Generate ID from slug or title
  const id = (input.slug && input.slug.trim()) || input.title.toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, '') // Keep letters/numbers incl. CJK, remove others
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();

  // Calculate word count (rough estimate)
  const wordCount = input.content.split(/\s+/).length;
  
  // Calculate read time (assuming 200 words per minute)
  const readTimeMinutes = Math.ceil(wordCount / 200);
  const readTime = `${readTimeMinutes}分钟`;

  // Generate excerpt from content (first 100 characters)
  const excerpt = input.content.length > 100 ? input.content.substring(0, 100) + '...' : input.content;

  return {
    id,
    title: input.title,
    content: `<p>${input.content}</p>`, // Wrap in HTML paragraph
    excerpt,
    date: formattedDate,
    category: input.category || '教程',
    readTime,
    author: input.author || 'WPS 团队',
    tags: input.tags || ['WPS Office', '办公软件'],
    lastModified: formattedDate,
    wordCount,
    relatedPosts: []
  };
};

const postFromJson = async (jsonFilePath: string) => {
  try {
    // Read the JSON file
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const input: BlogPostInput = JSON.parse(jsonContent);
    
    // Validate required fields
    if (!input.title || !input.content) {
      console.error('❌ Error: JSON file must contain "title" and "content" fields');
      process.exit(1);
    }
    
    // Generate blog post data
    const blogPost = generateBlogPostFromInput(input);
    
    // Read existing blog posts
    const blogPostsPath = path.join(process.cwd(), 'public/blog-posts.json');
    let existingPosts: BlogPostData[] = [];
    
    if (fs.existsSync(blogPostsPath)) {
      const existingContent = fs.readFileSync(blogPostsPath, 'utf8');
      const existingData = JSON.parse(existingContent);
      existingPosts = existingData.posts || [];
    }
    
    // Normalize helper to avoid duplicates by near-identical titles (incl. CJK)
    const normalize = (str: string) => str
      .toLowerCase()
      .replace(/[\p{Cf}\p{Z}\s_-]+/gu, '-')
      .replace(/[^\p{L}\p{N}-]/gu, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    // Build maps for quick checks
    const idIndex = existingPosts.findIndex(post => post.id === blogPost.id);
    const titleIndex = existingPosts.findIndex(post => normalize(post.title) === normalize(blogPost.title));

    // Check if post with same ID or normalized title already exists
    const existingIndex = idIndex >= 0 ? idIndex : titleIndex;
    if (existingIndex >= 0) {
      // Update existing post
      existingPosts[existingIndex] = blogPost;
      console.log(`🔄 Updated existing blog post (deduped by ${idIndex>=0?'id':'title'}): "${blogPost.title}"`);
    } else {
      // Add new post
      existingPosts.push(blogPost);
      console.log(`✅ Successfully posted new blog: "${blogPost.title}"`);
    }
    
    // Save updated blog posts
    const updatedData = { posts: existingPosts };
    fs.writeFileSync(blogPostsPath, JSON.stringify(updatedData, null, 2), 'utf8');
    
    console.log(`📝 Blog post ID: ${blogPost.id}`);
    console.log(`📅 Date: ${blogPost.date}`);
    console.log(`🏷️  Category: ${blogPost.category}`);
    console.log(`🏷️  Tags: ${blogPost.tags.join(', ')}`);
    console.log(`📊 Word count: ${blogPost.wordCount}`);
    console.log(`⏱️  Read time: ${blogPost.readTime}`);
    console.log(`📁 File saved: ${blogPostsPath}`);
    console.log(`🌐 URL: http://localhost:8080/blog/${blogPost.id}`);
    
  } catch (error) {
    console.error('❌ Error posting from JSON:', error);
    process.exit(1);
  }
};

// CLI usage
const jsonFilePath = process.argv[2];

if (!jsonFilePath) {
  console.log('Usage: yarn blog:post <path-to-json-file>');
  console.log('');
  console.log('Example JSON structure:');
  console.log(JSON.stringify({
    title: "Your Blog Post Title",
    content: "Your blog post content here...",
    category: "教程",
    tags: ["WPS Office", "办公软件", "教程"],
    slug: "your-custom-slug",
    author: "WPS 团队"
  }, null, 2));
  process.exit(1);
}

if (!fs.existsSync(jsonFilePath)) {
  console.error(`❌ JSON file not found: ${jsonFilePath}`);
  process.exit(1);
}

postFromJson(jsonFilePath).catch(console.error);
