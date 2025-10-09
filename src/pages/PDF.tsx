import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const PDF: React.FC = () => {
  useSEO({
    title: 'WPS PDF - 免费PDF编辑器 | PDF转Word/Excel/PPT工具',
    description: 'WPS PDF是专业的PDF处理工具，支持PDF编辑、转换、合并、拆分、压缩等功能。轻松实现PDF转Word、Excel、PPT，添加水印、注释、签名。免费、安全、高效的PDF解决方案！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/pdf',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS PDF',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'PDF Editor',
      operatingSystem: 'Windows, macOS, Linux, Android, iOS',
      description: '免费PDF编辑器，支持PDF转换、编辑、合并、压缩等功能',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/017_office_pdf_.html" 
      title="WPS PDF - 專業PDF編輯軟體"
    />
  );
};

export default PDF;
