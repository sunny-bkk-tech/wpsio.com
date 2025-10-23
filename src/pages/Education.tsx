import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Education: React.FC = () => {
  useSEO({
    title: 'WPS Office 教育版 - 專為教育機構設計的辦公解決方案',
    description: '面向學校與教育機構的 WPS Office 教育版解決方案。為中小學、大學、培訓機構提供免費或優惠的辦公軟件授權。包含教學課件製作、作業批改、成績管理、考試題庫、教案模板等專業功能。支援師生協作編輯、線上教學、雲端儲存。提供教育優惠價格、批量部署、技術培訓。助力數位化教育發展，讓教學更高效！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/002_education_.html" 
      title="WPS Office 教育版 - 專為教育機構設計的辦公解決方案"
    />
  );
};

export default Education;
