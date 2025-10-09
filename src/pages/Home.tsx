import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Home: React.FC = () => {
  useSEO({
    title: 'WPS Office中文官方网站 - 免费办公软件下载 | WPS文字、表格、演示',
    description: '免费下载WPS Office中文版！完美兼容Microsoft Office，支持Word、Excel、PPT文档编辑。适用于Windows、Mac、Linux、Android和iOS。AI智能助手，提升办公效率，轻松完成各类办公任务。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    locale: 'zh_CN',
    canonical: 'https://www.wpsio.com/',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'WPS Office',
        alternateName: 'WPS办公软件',
        url: 'https://www.wpsio.com/',
        description: '免费办公软件套件，支持文字处理、电子表格、演示文稿和PDF编辑',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://www.wpsio.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'WPS Office',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows, macOS, Linux, Android, iOS',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'CNY',
          availability: 'https://schema.org/InStock'
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.7',
          ratingCount: '10000',
          bestRating: '5',
          worstRating: '1'
        },
        description: '免费办公软件，完美兼容Microsoft Office格式，支持Word、Excel、PowerPoint文档编辑'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'WPS Office',
        url: 'https://www.wpsio.com/',
        logo: 'https://www.wpsio.com/vite.svg',
        description: 'WPS Office - 领先的免费办公软件提供商'
      }
    ]
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/001_index.html" 
      title="WPS Office - AI驅動的辦公套件"
    />
  );
};

export default Home;