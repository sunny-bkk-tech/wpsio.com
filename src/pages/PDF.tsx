import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const PDF: React.FC = () => {
  useSEO({
    title: 'WPS PDF - 免费PDF编辑器 | PDF转Word/Excel/PPT工具',
    description: 'WPS PDF是全能PDF处理工具，支持PDF阅读、编辑、转换、合并、拆分、压缩、加密等20+功能。轻松实现PDF转Word/Excel/PPT/图片格式互转，支持添加水印、批注、电子签名、表单填写、OCR文字识别。采用银行级加密技术，保护文档安全。免费使用，是Adobe Acrobat的最佳替代方案！',
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
