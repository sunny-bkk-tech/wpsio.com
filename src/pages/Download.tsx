import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Download: React.FC = () => {
  useSEO({
    title: 'WPS Office下载 - 免费办公软件 | Windows/Mac/Linux/手机版',
    description: '免费下载WPS Office中文版！支持Windows 11/10、macOS、Linux、Android、iOS。完美兼容Microsoft Office，轻松编辑Word、Excel、PPT文档。安全、快速、无广告，立即下载体验！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/download',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Office',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows 11, Windows 10, macOS, Linux, Android, iOS',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY',
        availability: 'https://schema.org/InStock'
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.7',
        ratingCount: '50000'
      },
      softwareVersion: '2024',
      fileSize: '200MB',
      downloadUrl: 'https://www.wpsio.com/download'
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/012_download_.html" 
      title="下載 WPS Office - 免費Office下載"
    />
  );
};

export default Download;