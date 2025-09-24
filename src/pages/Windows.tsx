import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Windows: React.FC = () => {
  useSEO({
    title: 'WPS Office for Windows - Windows版辦公軟體',
    description: '下載並體驗 WPS Office Windows 版本，兼容常用文檔格式，滿足個人與企業辦公需求。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/020_office_windows_.html" 
      title="WPS Office for Windows - Windows版辦公軟體"
    />
  );
};

export default Windows;
