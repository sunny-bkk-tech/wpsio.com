import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const IOS: React.FC = () => {
  useSEO({
    title: 'WPS Office iOS版下载 - iPhone/iPad办公APP | App Store官方',
    description: '下载WPS Office iOS版，iPhone和iPad专业办公软件。支持iOS 17/16/15系统，流畅编辑Word/Excel/PPT/PDF文档。提供iCloud云同步、Apple Pencil支持、Face ID安全保护、文档扫描等功能。App Store 4.8星好评！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/ios',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'WPS Office for iOS',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'iOS 17, iOS 16, iPadOS',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/021_office_ios_.html" 
      title="WPS Office for iOS - iOS版辦公軟體"
    />
  );
};

export default IOS;
