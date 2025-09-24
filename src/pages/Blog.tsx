import React from 'react';
import { useSEO } from '../utils/useSEO';
import Layout from '../components/Layout';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: 'excel',
      title: 'Excel 高级技巧',
      excerpt: '掌握 Excel 高级功能',
      date: '2025-09-24',
      category: '教程',
      readTime: '1分钟'
    },
    {
      id: 'wps-office-2024',
      title: 'WPS Office 2024 新功能详解',
      excerpt: '了解 WPS Office 最新版本带来的强大功能',
      date: '2025-09-24',
      category: '新功能',
      readTime: '1分钟'
    },
    {
      id: 'wps-office-2024-new-features',
      title: 'WPS Office 2024 新功能详解',
      excerpt: '了解 WPS Office 最新版本带来的强大功能，提升您的办公效率。',
      date: '2025-01-15',
      category: '新功能',
      readTime: '5分钟'
    },
    {
      id: 'excel-formulas-beginners-guide',
      title: 'Excel 公式入门指南 - 从零开始学表格',
      excerpt: '掌握 Excel 基础公式，让数据处理变得简单高效。',
      date: '2025-01-08',
      category: '教程',
      readTime: '8分钟'
    },
    {
      id: 'powerpoint-design-tips',
      title: 'PowerPoint 设计技巧 - 制作专业演示文稿',
      excerpt: '学习如何设计吸引人的演示文稿，提升您的演讲效果。',
      date: '2025-01-01',
      category: '设计',
      readTime: '6分钟'
    }
  ];

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
