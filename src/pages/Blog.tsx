import React, { useEffect, useState } from 'react';
import { useSEO } from '../utils/useSEO';
import Layout from '../components/Layout';
import { getBlogPostsList } from '../utils/blogData';
import type { BlogPostData } from '../types/blog';

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        const posts = await getBlogPostsList();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);

  useSEO({
    title: 'WPS Office 博客 - 办公软件技巧与教程 | 提升办公效率',
    description: '探索 WPS Office 最新功能、使用技巧、办公效率提升方法。获取专业的文档编辑、表格制作、演示文稿设计指南。每日更新，助您成为办公高手。',
    canonical: 'https://www.wpsio.com/blog',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    ogType: 'website',
    locale: 'zh_CN',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'WPS Office 博客',
        url: 'https://www.wpsio.com/blog',
        description: 'WPS Office 使用技巧与办公效率提升指南',
        inLanguage: 'zh-CN',
        publisher: {
          '@type': 'Organization',
          name: 'WPS-IO Office',
          url: 'https://www.wpsio.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.wpsio.com/vite.svg'
          }
        },
        blogPost: blogPosts.map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `https://www.wpsio.com/blog/${post.id}`,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: 'WPS 团队'
          }
        }))
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
          }
        ]
      }
    ]
  });

  if (loading) {
    return (
      <Layout>
        <div className="blog-page">
          <div className="container">
            <div className="loading">Loading blog posts...</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="blog-page">
        <div className="container">
          <header className="blog-header">
            <h1>WPS Office 博客</h1>
            <p>探索办公软件技巧，提升工作效率</p>
          </header>

          <div className="blog-posts">
            {blogPosts.map((post) => (
              <article key={post.id} className="blog-post-card">
                <div className="post-meta">
                  <span className="category">{post.category}</span>
                  <span className="date">{post.date}</span>
                  <span className="read-time">{post.readTime}</span>
                </div>
                <h2>
                  <a href={`/blog/${post.id}`}>{post.title}</a>
                </h2>
                <p className="excerpt">{post.excerpt}</p>
                <a href={`/blog/${post.id}`} className="read-more">阅读全文 →</a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
