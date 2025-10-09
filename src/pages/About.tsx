import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const About: React.FC = () => {
  useSEO({
    title: '关于WPS Office - 公司简介/发展历程/企业使命',
    description: '了解WPS Office的品牌故事与发展历程。30年专注办公软件研发，服务全球5亿+用户。致力于为个人、企业提供高效、便捷、智能的办公解决方案，让办公更简单！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/about',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'WPS Office',
      alternateName: 'WPS办公软件',
      url: 'https://www.wpsio.com/',
      logo: 'https://www.wpsio.com/vite.svg',
      description: '全球领先的办公软件提供商',
      foundingDate: '1988',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        value: '2000'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/007_about-us_.html" 
      title="關於 WPS Office - 我們的使命、歷史和社會責任"
    />
  );
};

export default About;