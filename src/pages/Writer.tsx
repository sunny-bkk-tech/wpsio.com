import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Writer: React.FC = () => {
  useSEO({
    title: 'WPS文字 - 免费Word文档编辑器 | 兼容DOC/DOCX格式',
    description: 'WPS文字是强大的文档编辑工具，完美兼容Microsoft Word格式（DOC/DOCX）。提供AI智能写作、模板库、多人协作等功能。支持PDF转Word、文档加密、云端存储，让文字处理更高效！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/writer',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Writer',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Word Processor',
      operatingSystem: 'Windows, macOS, Linux, Android, iOS',
      description: '免费文档编辑器，兼容Microsoft Word，支持DOC、DOCX格式',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/008_office_writer_.html" 
      title="WPS Writer - 強大的文書處理軟體"
    />
  );
};

export default Writer;
