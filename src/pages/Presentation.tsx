import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Presentation: React.FC = () => {
  useSEO({
    title: 'WPS演示 - 免费PPT制作软件 | 兼容PowerPoint格式',
    description: 'WPS演示是专业的幻灯片制作工具，完美兼容Microsoft PowerPoint（PPT/PPTX/PPTM）。提供5000+精美模板、炫酷动画效果、SmartArt图形、音视频插入、屏幕录制、演讲者视图、激光笔等功能。AI一键美化设计，支持实时协作编辑、远程演示、云端分享。轻松打造专业商务演示文稿！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/presentation',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Presentation',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Presentation Software',
      operatingSystem: 'Windows, macOS, Linux, Android, iOS',
      description: '免费幻灯片制作软件，兼容Microsoft PowerPoint，支持PPT、PPTX格式',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/016_office_presentation_.html" 
      title="WPS Presentation - 專業簡報製作軟體"
    />
  );
};

export default Presentation;
