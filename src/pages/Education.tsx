import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Education: React.FC = () => {
  useSEO({
    title: 'WPS Office 教育版 - 專為教育機構設計的辦公解決方案',
    description: '面向學校與教育機構的 WPS Office 解決方案，提供教學與學習所需的高效工具與資源。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/002_education_.html" 
      title="WPS Office 教育版 - 專為教育機構設計的辦公解決方案"
    />
  );
};

export default Education;
