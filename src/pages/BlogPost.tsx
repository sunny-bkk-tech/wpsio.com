import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../utils/useSEO';
import Layout from '../components/Layout';
import { getAllBlogPosts } from '../utils/blogData';
import type { BlogPostData } from '../types/blog';

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blogPosts, setBlogPosts] = useState<Record<string, BlogPostData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await getAllBlogPosts();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  const post = id ? blogPosts[id] : null;
  const effectivePost: BlogPostData = post || {
    id: 'not-found',
    title: '文章未找到',
    excerpt: '文章未找到',
    content: '<p>抱歉，您要查找的文章不存在。</p>',
    date: '',
    category: '',
    readTime: '',
    author: 'WPS 团队',
    tags: []
  };

  useSEO({
    title: `${effectivePost.title} - WPS Office 博客`,
    description: effectivePost.excerpt,
    canonical: `https://www.wpsio.com/blog/${effectivePost.id}`,
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    ogType: 'article',
    locale: 'zh_CN',
    jsonLd: effectivePost.id !== 'not-found' ? [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: effectivePost.title,
        description: effectivePost.excerpt,
        datePublished: effectivePost.date,
        dateModified: effectivePost.lastModified || effectivePost.date,
        author: {
          '@type': 'Person',
          name: effectivePost.author,
          url: 'https://www.wpsio.com/about'
        },
        publisher: {
          '@type': 'Organization',
          name: 'WPS Office',
          url: 'https://www.wpsio.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.wpsio.com/vite.svg'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://www.wpsio.com/blog/${effectivePost.id}`
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://www.wpsio.com/vite.svg',
          width: 1200,
          height: 630
        },
        keywords: effectivePost.tags.join(', '),
        wordCount: effectivePost.wordCount,
        timeRequired: effectivePost.readTime,
        articleSection: effectivePost.category,
        inLanguage: 'zh-CN'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首页',
            item: 'https://www.wpsio.com'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '博客',
            item: 'https://www.wpsio.com/blog'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: effectivePost.title,
            item: `https://www.wpsio.com/blog/${effectivePost.id}`
          }
        ]
      }
    ] : undefined
  });

  if (loading) {
    return (
      <Layout>
        <div className="blog-post">
          <div className="container">
            <div className="loading">Loading blog post...</div>
          </div>
        </div>
      </Layout>
    );
  }

  // Get related posts
  const getRelatedPosts = () => {
    if (!effectivePost.relatedPosts || effectivePost.id === 'not-found') return [];
    return effectivePost.relatedPosts
      .map((postId: string) => blogPosts[postId])
      .filter(Boolean)
      .slice(0, 3);
  };

  const relatedPosts = getRelatedPosts();

  return (
    <Layout>
      
      <div className="blog-post">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="面包屑导航">
            <ol>
              <li><a href="/">首页</a></li>
              <li><a href="/blog">博客</a></li>
              <li aria-current="page">{effectivePost.title}</li>
            </ol>
          </nav>

          <article itemScope itemType="https://schema.org/BlogPosting">
            <header className="post-header">
              <div className="post-meta">
                {effectivePost.id !== 'not-found' ? (
                  <>
                    <span className="category" itemProp="articleSection">{effectivePost.category}</span>
                    <time className="date" dateTime={effectivePost.date} itemProp="datePublished">{effectivePost.date}</time>
                    <span className="read-time" itemProp="timeRequired">{effectivePost.readTime}</span>
                    <span className="author" itemProp="author" itemScope itemType="https://schema.org/Person">
                      <span itemProp="name">作者：{effectivePost.author}</span>
                    </span>
                    {effectivePost.wordCount && (
                      <span className="word-count">字数：{effectivePost.wordCount}</span>
                    )}
                  </>
                ) : null}
              </div>
              <h1 itemProp="headline">{effectivePost.title}</h1>
              {effectivePost.id !== 'not-found' ? (
                <div className="tags">
                  {effectivePost.tags.map((tag: string) => (
                    <span key={tag} className="tag" itemProp="keywords">#{tag}</span>
                  ))}
                </div>
              ) : null}
            </header>
            
            
            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: effectivePost.content }}
              itemProp="articleBody"
            />
            
            <footer className="post-footer">
              <div className="social-sharing">
                <h3>分享这篇文章</h3>
                <div className="share-buttons">
                  <a href={`https://www.facebook.com/sharer/sharer.php?u=https://www.wpsio.com/blog/${effectivePost.id}`} 
                     target="_blank" rel="noopener noreferrer" aria-label="分享到 Facebook">
                    Facebook
                  </a>
                  <a href={`https://twitter.com/intent/tweet?url=https://www.wpsio.com/blog/${effectivePost.id}&text=${encodeURIComponent(effectivePost.title)}`} 
                     target="_blank" rel="noopener noreferrer" aria-label="分享到 Twitter">
                    Twitter
                  </a>
                  <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://www.wpsio.com/blog/${effectivePost.id}`} 
                     target="_blank" rel="noopener noreferrer" aria-label="分享到 LinkedIn">
                    LinkedIn
                  </a>
                </div>
              </div>
              
              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>相关文章</h3>
                  <div className="related-posts-grid">
                    {relatedPosts.map((post: BlogPostData) => (
                      <div key={post.id} className="related-post-card">
                        <h4><a href={`/blog/${post.id}`}>{post.title}</a></h4>
                        <p>{post.excerpt}</p>
                        <span className="related-post-meta">{post.date} · {post.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <a href="/blog" className="back-to-blog">← 返回博客</a>
            </footer>
          </article>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPost;
