import type { BlogPostData } from '../types/blog';

interface BlogPostsResponse {
  posts: BlogPostData[];
}

// Function to get all blog posts (from single JSON file)
export const getAllBlogPosts = async (): Promise<Record<string, BlogPostData>> => {
  try {
    const response = await fetch('/blog-posts.json');
    const data: BlogPostsResponse = await response.json();
    // Read-time safety: dedupe by normalized title, prefer newest date
    const normalize = (str: string) => str
      .toLowerCase()
      .replace(/[\p{Cf}\p{Z}\s_-]+/gu, '-')
      .replace(/[^\p{L}\p{N}-]/gu, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');

    const latestByTitle = new Map<string, BlogPostData>();
    for (const post of data.posts) {
      const key = normalize(post.title);
      const existing = latestByTitle.get(key);
      if (!existing) {
        latestByTitle.set(key, post);
        continue;
      }
      const existingTime = new Date(existing.date || existing.lastModified || 0).getTime();
      const currentTime = new Date(post.date || post.lastModified || 0).getTime();
      if (currentTime >= existingTime) {
        latestByTitle.set(key, post);
      }
    }

    const postsMap: Record<string, BlogPostData> = {};
    Array.from(latestByTitle.values()).forEach(post => {
      postsMap[post.id] = post;
    });

    return postsMap;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return {};
  }
};

// Function to get blog post by ID
export const getBlogPostById = async (id: string): Promise<BlogPostData | null> => {
  const allPosts = await getAllBlogPosts();
  return allPosts[id] || null;
};

// Function to get blog posts list for the blog page
export const getBlogPostsList = async (): Promise<BlogPostData[]> => {
  const allPosts = await getAllBlogPosts();
  return Object.values(allPosts).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
