import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const PrivacyPolicy: React.FC = () => {
  useSEO({
    title: '隱私政策 - WPS Office',
    description: '瞭解 WPS Office 如何保護您的隱私與數據安全，包括收集、使用與存儲方式。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/015_privacy-policy_.html" 
      title="隱私政策 - WPS Office"
    />
  );
};

export default PrivacyPolicy;
