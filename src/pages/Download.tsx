import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Download: React.FC = () => {
  useSEO({
    title: 'WPS Office下载 - 免费办公软件 | Windows/Mac/Linux/手机版',
    description: '免费下载WPS Office中文版全平台安装包！支持Windows 11/10、macOS、Linux、Android、iOS系统。完美兼容Microsoft Office格式，轻松编辑Word/Excel/PPT文档。体积小巧仅210MB，安全快速无广告无捆绑。提供个人版和专业版，立即下载体验高效办公！',
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