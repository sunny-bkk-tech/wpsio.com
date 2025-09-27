import React, { useEffect, useState } from 'react';
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
}

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Mock data - in real app, fetch from API
    const mockTemplates: Template[] = [
      {
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
        dateAdded: '2025-09-25'
      },
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
        dateAdded: '2025-09-24'
      },
      {
        id: 'invoice-template-simple',
        title: '简单发票模板',
        description: '适合小企业的发票模板，包含税务信息',
        category: 'business',
        downloadUrl: '/templates/invoice-template-simple.docx',
        previewUrl: '/templates/previews/invoice-template-simple.jpg',
        fileSize: '1.5 MB',
        format: 'DOCX',
        tags: ['发票', '财务', '税务', '小企业'],
        downloads: 2100,
        rating: 4.9,
        author: 'WPS 团队',
        dateAdded: '2025-09-23'
      },
      {
        id: 'presentation-template-modern',
        title: '现代演示文稿模板',
        description: '适合商务演示的现代风格PPT模板',
        category: 'presentation',
        downloadUrl: '/templates/presentation-template-modern.pptx',
        previewUrl: '/templates/previews/presentation-template-modern.jpg',
        fileSize: '5.2 MB',
        format: 'PPTX',
        tags: ['演示', '商务', '现代', 'PPT'],
        downloads: 1680,
        rating: 4.7,
        author: 'WPS 团队',
        dateAdded: '2025-09-22'
      },
      {
        id: 'budget-spreadsheet-template',
        title: '预算表格模板',
        description: '个人和家庭预算管理Excel模板',
        category: 'spreadsheet',
        downloadUrl: '/templates/budget-spreadsheet-template.xlsx',
        previewUrl: '/templates/previews/budget-spreadsheet-template.jpg',
        fileSize: '3.1 MB',
        format: 'XLSX',
        tags: ['预算', '财务', 'Excel', '管理'],
        downloads: 3200,
        rating: 4.8,
        author: 'WPS 团队',
        dateAdded: '2025-09-21'
      },
      {
        id: 'meeting-minutes-template',
        title: '会议纪要模板',
        description: '标准会议纪要模板，包含议程和决议记录',
        category: 'business',
        downloadUrl: '/templates/meeting-minutes-template.docx',
        previewUrl: '/templates/previews/meeting-minutes-template.jpg',
        fileSize: '1.2 MB',
        format: 'DOCX',
        tags: ['会议', '纪要', '办公', '记录'],
        downloads: 1450,
        rating: 4.5,
        author: 'WPS 团队',
        dateAdded: '2025-09-20'
      }
    ];

    setTimeout(() => {
      setTemplates(mockTemplates);
      setLoading(false);
    }, 500);
  }, []);

  const categories = [
    { id: 'all', name: '全部模板' },
    { id: 'resume', name: '简历模板' },
    { id: 'business', name: '商务模板' },
    { id: 'presentation', name: '演示模板' },
    { id: 'spreadsheet', name: '表格模板' }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  useSEO({
    title: '免费办公模板下载 - WPS Office 模板库 | 简历、商务、演示模板',
    description: '下载免费的专业办公模板，包括简历模板、商务信函、演示文稿、Excel表格等。WPS Office 提供高质量、可编辑的办公模板，提升您的工作效率。',
    canonical: 'https://www.wpsio.com/templates',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    ogType: 'website',
    locale: 'zh_CN',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'WPS Office 免费模板库',
        url: 'https://www.wpsio.com/templates',
        description: '免费下载专业办公模板，提升工作效率',
        inLanguage: 'zh-CN',
        publisher: {
          '@type': 'Organization',
          name: 'WPS-IO Office',
          url: 'https://www.wpsio.com'
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: templates.length,
          itemListElement: templates.map((template, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'CreativeWork',
              name: template.title,
              description: template.description,
              url: `https://www.wpsio.com/templates/${template.id}`,
              fileFormat: template.format,
              author: {
                '@type': 'Organization',
                name: template.author
              }
            }
          }))
        }
      }
    ]
  });

  if (loading) {
    return (
      <Layout>
        <div className="templates-page">
          <div className="container">
            <div className="loading">Loading templates...</div>
          </div>
        </div>
      </Layout>
      );
    }

  return (
    <Layout>
      <div className="templates-page">
        <div className="container">
          <header className="templates-header">
            <h1>免费办公模板下载</h1>
            <p>专业设计的办公模板，提升您的工作效率</p>
          </header>

          <div className="templates-filters">
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="templates-grid">
            {filteredTemplates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-preview">
                  <img 
                    src={template.previewUrl} 
                    alt={template.title}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/vite.svg';
                    }}
                  />
                  <div className="template-overlay">
                    <a href={`/templates/${template.id}`} className="preview-btn">
                      预览详情
                    </a>
                  </div>
                </div>
                <div className="template-info">
                  <h3>{template.title}</h3>
                  <p className="template-description">{template.description}</p>
                  <div className="template-meta">
                    <span className="format">{template.format}</span>
                    <span className="size">{template.fileSize}</span>
                    <span className="downloads">{template.downloads} 下载</span>
                  </div>
                  <div className="template-rating">
                    <span className="stars">★★★★★</span>
                    <span className="rating">{template.rating}</span>
                  </div>
                  <div className="template-tags">
                    {template.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                  <div className="template-actions">
                    <a 
                      href={template.downloadUrl} 
                      className="download-btn"
                      download
                    >
                      免费下载
                    </a>
                    <a href={`/templates/${template.id}`} className="detail-btn">
                      查看详情
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <div className="no-templates">
              <p>该分类下暂无模板</p>
            </div>
          )}

          <div className="templates-footer">
            <h3>为什么选择我们的模板？</h3>
            <div className="features">
              <div className="feature">
                <h4>✅ 完全免费</h4>
                <p>所有模板完全免费下载使用</p>
              </div>
              <div className="feature">
                <h4>✅ 专业设计</h4>
                <p>由专业设计师精心制作</p>
              </div>
              <div className="feature">
                <h4>✅ 易于编辑</h4>
                <p>使用 WPS Office 轻松编辑</p>
              </div>
              <div className="feature">
                <h4>✅ 定期更新</h4>
                <p>持续添加新的模板</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
