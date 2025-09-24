import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Writer: React.FC = () => {
  useSEO({
    title: 'WPS Writer - 強大的文書處理軟體',
    description: '使用 WPS Writer 高效編輯與排版文檔，支援多種格式並提供智能寫作功能。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/008_office_writer_.html" 
      title="WPS Writer - 強大的文書處理軟體"
    />
  );
};

export default Writer;
