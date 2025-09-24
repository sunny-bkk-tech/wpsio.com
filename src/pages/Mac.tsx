import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Mac: React.FC = () => {
  useSEO({
    title: 'WPS Office for Mac - Mac版辦公軟體',
    description: '下載並體驗 WPS Office Mac 版本，提供流暢的文檔、表格與簡報處理體驗。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/013_office_mac_.html" 
      title="WPS Office for Mac - Mac版辦公軟體"
    />
  );
};

export default Mac;
