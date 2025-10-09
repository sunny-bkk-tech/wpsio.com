import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Linux: React.FC = () => {
  useSEO({
    title: 'WPS Office Linux版下载 - Ubuntu/Debian/Fedora | 开源办公软件',
    description: '下载WPS Office Linux版，支持Ubuntu、Debian、Fedora、Arch等主流发行版。免费开源办公套件，完美兼容Microsoft Office。提供DEB、RPM安装包，让Linux用户也能享受专业办公体验！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/linux',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Office for Linux',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Linux, Ubuntu, Debian, Fedora, Arch Linux',
      description: '免费Linux办公软件，支持主流Linux发行版',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/004_office_linux_.html" 
      title="WPS Office for Linux - Linux版辦公軟體"
    />
  );
};

export default Linux;
