export interface BlogPostData {
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
