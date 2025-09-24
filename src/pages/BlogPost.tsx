import React from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../utils/useSEO';
import Layout from '../components/Layout';

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
  featuredImage?: string;
  lastModified?: string;
  wordCount?: number;
  relatedPosts?: string[];
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, this would fetch from an API or CMS
  const blogPosts: Record<string, BlogPostData> = {
    'wps-office-2024-new-features': {
      id: 'wps-office-2024-new-features',
      title: 'WPS Office 2024 新功能详解 - 智能办公新时代',
      excerpt: '了解 WPS Office 最新版本带来的强大功能，提升您的办公效率。AI写作助手、云端协作、移动端优化等全新特性详解。',
      content: `
        <h2>WPS Office 2024 主要更新</h2>
        <p>WPS Office 2024 版本带来了许多令人兴奋的新功能，让您的办公体验更加流畅高效。作为全球领先的办公软件套件，WPS Office 持续创新，为用户提供更智能、更便捷的办公解决方案。</p>
        
        <h3>1. 智能写作助手</h3>
        <p>全新的 AI 写作助手可以帮助您：</p>
        <ul>
          <li>自动生成文档大纲和结构</li>
          <li>智能纠错和语法检查</li>
          <li>内容优化建议和润色</li>
          <li>多语言翻译支持</li>
        </ul>
        
        <h3>2. 云端协作增强</h3>
        <p>团队协作功能得到显著提升：</p>
        <ul>
          <li>实时多人编辑和同步</li>
          <li>智能评论和批注系统</li>
          <li>版本历史管理和恢复</li>
          <li>权限管理和访问控制</li>
        </ul>
        
        <h3>3. 移动端优化</h3>
        <p>手机和平板版本的用户界面更加直观，操作更加便捷。支持触控手势、语音输入、手写识别等移动端特色功能。</p>
        
        <h3>4. 性能提升</h3>
        <p>启动速度提升 40%，文件打开速度提升 60%，内存占用减少 30%，让您的办公更加高效。</p>
        
        <p>立即下载最新版本，体验这些强大的新功能！WPS Office 2024 让办公更智能、更高效。</p>
      `,
      date: '2025-01-15',
      category: '新功能',
      readTime: '5分钟',
      author: 'WPS 团队',
      tags: ['新功能', 'WPS Office', '办公软件', 'AI助手', '云端协作'],
      featuredImage: 'https://www.wpsio.com/wps_full_site/wps-office-2025.jpg',
      lastModified: '2025-01-15',
      wordCount: 320,
      relatedPosts: ['excel-formulas-beginners-guide', 'powerpoint-design-tips']
    },
    'excel-formulas-beginners-guide': {
      id: 'excel-formulas-beginners-guide',
      title: 'Excel 公式入门指南 - 从零开始学表格',
      excerpt: '掌握 Excel 基础公式，让数据处理变得简单高效。',
      content: `
        <h2>Excel 公式基础</h2>
        <p>Excel 公式是电子表格的核心功能，掌握基础公式可以大大提高您的工作效率。</p>
        
        <h3>1. 基本算术公式</h3>
        <p>最常用的公式包括：</p>
        <ul>
          <li>SUM() - 求和</li>
          <li>AVERAGE() - 平均值</li>
          <li>COUNT() - 计数</li>
          <li>MAX() / MIN() - 最大值/最小值</li>
        </ul>
        
        <h3>2. 文本处理公式</h3>
        <p>处理文本数据：</p>
        <ul>
          <li>CONCATENATE() - 连接文本</li>
          <li>LEFT() / RIGHT() - 提取字符</li>
          <li>LEN() - 计算长度</li>
        </ul>
        
        <h3>3. 日期和时间公式</h3>
        <p>处理日期数据：</p>
        <ul>
          <li>TODAY() - 当前日期</li>
          <li>DATEDIF() - 日期差</li>
          <li>YEAR() / MONTH() / DAY() - 提取日期部分</li>
        </ul>
        
        <p>通过练习这些基础公式，您将能够处理大部分日常数据任务。</p>
      `,
      date: '2025-01-08',
      category: '教程',
      readTime: '8分钟',
      author: 'WPS 团队',
      tags: ['Excel', '公式', '教程', '数据处理']
    },
    'powerpoint-design-tips': {
      id: 'powerpoint-design-tips',
      title: 'PowerPoint 设计技巧 - 制作专业演示文稿',
      excerpt: '学习如何设计吸引人的演示文稿，提升您的演讲效果。',
      content: `
        <h2>PowerPoint 设计原则</h2>
        <p>一个好的演示文稿不仅要有内容，更要有吸引人的视觉设计。</p>
        
        <h3>1. 色彩搭配</h3>
        <p>选择配色方案时要注意：</p>
        <ul>
          <li>使用品牌色彩</li>
          <li>保持色彩一致性</li>
          <li>确保文字可读性</li>
        </ul>
        
        <h3>2. 字体选择</h3>
        <p>字体设计要点：</p>
        <ul>
          <li>标题使用醒目字体</li>
          <li>正文选择易读字体</li>
          <li>避免使用过多字体</li>
        </ul>
        
        <h3>3. 布局设计</h3>
        <p>页面布局建议：</p>
        <ul>
          <li>保持简洁明了</li>
          <li>使用网格对齐</li>
          <li>留出适当空白</li>
        </ul>
        
        <h3>4. 动画效果</h3>
        <p>适度使用动画：</p>
        <ul>
          <li>不要过度使用</li>
          <li>保持动画一致性</li>
          <li>增强内容表达</li>
        </ul>
        
        <p>记住，好的设计应该服务于内容，而不是分散注意力。</p>
      `,
      date: '2025-01-01',
      category: '设计',
      readTime: '6分钟',
      author: 'WPS 团队',
      tags: ['PowerPoint', '设计', '演示文稿', '视觉设计']
    },
    'wps-office-2024': {
      id: 'wps-office-2024',
      title: 'WPS Office 2024 新功能详解',
      excerpt: '了解 WPS Office 最新版本带来的强大功能',
      content: `<p>了解 WPS Office 最新版本带来的强大功能</p>`,
      date: '2025-09-24',
      category: '新功能',
      readTime: '1分钟',
      author: 'WPS 团队',
      tags: ['新功能', 'WPS Office', '办公软件']
    },
      'excel': {
      id: 'excel',
      title: 'Excel 高级技巧',
      excerpt: '掌握 Excel 高级功能',
      content: `<p>掌握 Excel 高级功能</p>`,
      date: '2025-09-24',
      category: '教程',
      readTime: '1分钟',
      author: 'WPS 团队',
      tags: ['教程', 'WPS Office', '办公软件']
    },
    };

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
    image: effectivePost.featuredImage || 'https://www.wpsio.com/vite.svg',
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
          name: 'WPS-IO Office',
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
        image: effectivePost.featuredImage ? {
          '@type': 'ImageObject',
          url: effectivePost.featuredImage,
          width: 1200,
          height: 630
        } : undefined,
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

  // Get related posts
  const getRelatedPosts = () => {
    if (!effectivePost.relatedPosts || effectivePost.id === 'not-found') return [];
    return effectivePost.relatedPosts
      .map(postId => blogPosts[postId])
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
                  {effectivePost.tags.map((tag) => (
                    <span key={tag} className="tag" itemProp="keywords">#{tag}</span>
                  ))}
                </div>
              ) : null}
            </header>
            
            {effectivePost.featuredImage && (
              <div className="featured-image">
                <img 
                  src={effectivePost.featuredImage} 
                  alt={effectivePost.title}
                  itemProp="image"
                  loading="lazy"
                />
              </div>
            )}
            
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
                  <a href={`https://service.weibo.com/share/share.php?url=https://www.wpsio.com/blog/${effectivePost.id}&title=${encodeURIComponent(effectivePost.title)}`} 
                     target="_blank" rel="noopener noreferrer" aria-label="分享到微博">
                    微博
                  </a>
                </div>
              </div>
              
              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>相关文章</h3>
                  <div className="related-posts-grid">
                    {relatedPosts.map((post) => (
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
