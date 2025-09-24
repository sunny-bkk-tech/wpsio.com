import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Spreadsheet: React.FC = () => {
  useSEO({
    title: 'WPS Spreadsheet - 專業試算表軟體',
    description: '以 WPS Spreadsheet 處理數據、建立報表與圖表，輕鬆完成日常與商務數據分析。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/019_office_spreadsheet_.html" 
      title="WPS Spreadsheet - 專業試算表軟體"
    />
  );
};

export default Spreadsheet;
