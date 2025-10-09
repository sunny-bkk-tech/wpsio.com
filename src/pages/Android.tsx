import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Android: React.FC = () => {
  useSEO({
    title: 'WPS Office Android版下载 - 手机办公APP | Google Play官方',
    description: '下载WPS Office Android版，随时随地移动办公。支持查看、编辑Word、Excel、PPT文档，兼容各品牌Android手机。提供云同步、PDF阅读、文档扫描等功能。Google Play 4.7星好评，立即下载！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/android',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'WPS Office for Android',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Android',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/003_office_android_.html" 
      title="WPS Office for Android - Android版辦公軟體"
    />
  );
};

export default Android;
