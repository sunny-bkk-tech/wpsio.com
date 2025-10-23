import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Mac: React.FC = () => {
  useSEO({
    title: 'WPS Office Mac版下载 - 适配macOS Sonoma/Ventura | 免费办公软件',
    description: '下载WPS Office Mac版，完美适配macOS Sonoma/Ventura/Monterey系统。原生支持Apple M1/M2/M3芯片和Intel处理器。流畅编辑Word/Excel/PPT文档，支持暗黑模式和Retina显示。是Microsoft Office for Mac最佳免费替代！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/mac',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Office for Mac',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'macOS Sonoma, macOS Ventura, macOS Monterey',
      description: '免费Mac办公软件，支持M1/M2芯片，完美兼容Microsoft Office',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/013_office_mac_.html" 
      title="WPS Office for Mac - Mac版辦公軟體"
    />
  );
};

export default Mac;
