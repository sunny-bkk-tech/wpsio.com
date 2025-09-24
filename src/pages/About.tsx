import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const About: React.FC = () => {
  useSEO({
    title: '關於 WPS Office - 我們的使命、歷史和社會責任',
    description: '了解 WPS Office 的品牌故事、使命願景與社會責任，探索我們如何持續為全球用戶提供高效便捷的辦公體驗。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'WPS-IO Office',
      url: 'https://www.wpsio.com/'
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