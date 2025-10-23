import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Windows: React.FC = () => {
  useSEO({
    title: 'WPS Office Windows版下载 - 支持Win11/Win10 | 免费办公软件',
    description: '下载WPS Office Windows版官方安装包，完美兼容Windows 11/10/8/7系统（支持32/64位）。免费办公套件，全面支持Word/Excel/PPT/PDF文档编辑。安装包仅210MB，启动速度快3倍，界面简洁美观，内存占用低。是Microsoft Office的最佳免费替代品！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/windows',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Office for Windows',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Windows 11, Windows 10, Windows 8, Windows 7',
      description: '免费Windows办公软件，完美兼容Microsoft Office',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/020_office_windows_.html" 
      title="WPS Office for Windows - Windows版辦公軟體"
    />
  );
};

export default Windows;
