import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSEO } from '../utils/useSEO';
import Layout from '../components/Layout';

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  downloadUrl: string;
  previewUrl: string;
  fileSize: string;
  format: string;
  tags: string[];
  downloads: number;
  rating: number;
  author: string;
  dateAdded: string;
  longDescription: string;
  features: string[];
  instructions: string[];
  relatedTemplates: string[];
}

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedTemplates, setRelatedTemplates] = useState<Template[]>([]);

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockTemplate: Template = {
      id: 'resume-template-2025',
      title: '专业简历模板 2025',
      description: '现代简洁的简历模板，适合各种行业，包含中英文版本',
      category: 'resume',
      downloadUrl: '/templates/resume-template-2025.docx',
      previewUrl: '/templates/previews/resume-template-2025.jpg',
      fileSize: '2.1 MB',
      format: 'DOCX',
      tags: ['简历', '求职', '专业', '2025'],
      downloads: 1250,
      rating: 4.8,
      author: 'WPS 团队',
      dateAdded: '2025-09-25',
      longDescription: '这是一款专为2025年设计的现代简历模板，采用简洁大方的设计风格，适合各种行业和职位。模板包含完整的简历结构，包括个人信息、工作经历、教育背景、技能专长等部分，同时提供中英文两个版本，满足不同需求。',
      features: [
        '现代简洁的设计风格',
        '中英文双语版本',
        '适合各种行业和职位',
        '完整的简历结构',
        '易于编辑和自定义',
        '打印友好的格式'
      ],
      instructions: [
        '下载模板文件到本地',
        '使用 WPS Office 打开文件',
        '根据个人情况填写信息',
        '调整格式和样式',
        '保存并打印或发送'
      ],
      relatedTemplates: ['business-letter-template', 'meeting-minutes-template']
    };

    const mockRelated: Template[] = [
      {
        id: 'business-letter-template',
        title: '商务信函模板',
        description: '正式商务信函模板，包含多种格式和样式',
        category: 'business',
        downloadUrl: '/templates/business-letter-template.docx',
        previewUrl: '/templates/previews/business-letter-template.jpg',
        fileSize: '1.8 MB',
        format: 'DOCX',
        tags: ['商务', '信函', '正式', '商业'],
        downloads: 890,
        rating: 4.6,
        author: 'WPS 团队',
        dateAdded: '2025-09-24',
        longDescription: '',
        features: [],
        instructions: [],
        relatedTemplates: []
      }
    ];

    setTimeout(() => {
      setTemplate(mockTemplate);
      setRelatedTemplates(mockRelated);
      setLoading(false);
    }, 500);
  }, [id]);

  useSEO({
    title: template ? `${template.title} - 免费下载 | WPS Office 模板` : '模板详情',
    description: template ? template.longDescription || template.description : '专业办公模板详情页面',
    canonical: `https://www.wpsio.com/templates/${id}`,
    robots: 'index,follow',
    image: template ? `https://www.wpsio.com${template.previewUrl}` : 'https://www.wpsio.com/vite.svg',
    ogType: 'article',
    locale: 'zh_CN',
    jsonLd: template ? [
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: template.title,
        description: template.longDescription || template.description,
        url: `https://www.wpsio.com/templates/${template.id}`,
        fileFormat: template.format,
        author: {
          '@type': 'Organization',
          name: template.author
        },
        datePublished: template.dateAdded,
        downloadUrl: `https://www.wpsio.com${template.downloadUrl}`,
        keywords: template.tags.join(', '),
        inLanguage: 'zh-CN'
      }
    ] : undefined
  });

  if (loading) {
    return (
      <Layout>
        <div className="template-detail">
          <div className="container">
            <div className="loading">Loading template...</div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!template) {
    return (
      <Layout>
        <div className="template-detail">
          <div className="container">
            <div className="error">Template not found</div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="template-detail">
        <div className="container">
          {/* Breadcrumbs */}
          <nav className="breadcrumbs" aria-label="面包屑导航">
            <ol>
              <li><a href="/">首页</a></li>
              <li><a href="/templates">模板库</a></li>
              <li aria-current="page">{template.title}</li>
            </ol>
          </nav>

          <div className="template-detail-content">
            <div className="template-main">
              <div className="template-preview-large">
                <img 
                  src={template.previewUrl} 
                  alt={template.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/vite.svg';
                  }}
                />
              </div>

              <div className="template-info">
                <h1>{template.title}</h1>
                <p className="template-description">{template.longDescription}</p>

                <div className="template-stats">
                  <div className="stat">
                    <span className="label">下载次数:</span>
                    <span className="value">{template.downloads.toLocaleString()}</span>
                  </div>
                  <div className="stat">
                    <span className="label">评分:</span>
                    <span className="value">
                      <span className="stars">★★★★★</span>
                      {template.rating}
                    </span>
                  </div>
                  <div className="stat">
                    <span className="label">文件大小:</span>
                    <span className="value">{template.fileSize}</span>
                  </div>
                  <div className="stat">
                    <span className="label">格式:</span>
                    <span className="value">{template.format}</span>
                  </div>
                </div>

                <div className="template-tags">
                  {template.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>

                <div className="template-actions">
                  <a 
                    href={template.downloadUrl} 
                    className="download-btn primary"
                    download
                  >
                    📥 免费下载
                  </a>
                  <a href="/templates" className="back-btn">
                    ← 返回模板库
                  </a>
                </div>
              </div>
            </div>

            <div className="template-details">
              <div className="details-section">
                <h3>模板特色</h3>
                <ul className="features-list">
                  {template.features.map((feature, index) => (
                    <li key={index}>✅ {feature}</li>
                  ))}
                </ul>
              </div>

              <div className="details-section">
                <h3>使用说明</h3>
                <ol className="instructions-list">
                  {template.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>

              <div className="details-section">
                <h3>模板信息</h3>
                <div className="template-meta">
                  <p><strong>作者:</strong> {template.author}</p>
                  <p><strong>发布日期:</strong> {template.dateAdded}</p>
                  <p><strong>分类:</strong> {template.category}</p>
                  <p><strong>文件格式:</strong> {template.format}</p>
                </div>
              </div>
            </div>

            {relatedTemplates.length > 0 && (
              <div className="related-templates">
                <h3>相关模板</h3>
                <div className="related-grid">
                  {relatedTemplates.map(related => (
                    <div key={related.id} className="related-card">
                      <img 
                        src={related.previewUrl} 
                        alt={related.title}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/vite.svg';
                        }}
                      />
                      <div className="related-info">
                        <h4><a href={`/templates/${related.id}`}>{related.title}</a></h4>
                        <p>{related.description}</p>
                        <div className="related-meta">
                          <span>{related.downloads} 下载</span>
                          <span>★ {related.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TemplateDetail;
