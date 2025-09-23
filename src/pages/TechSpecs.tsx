import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const TechSpecs: React.FC = () => {
  useSEO({
    title: '技術規格 - WPS Office',
    description: '查看 WPS Office 的系統需求、支援平台與版本資訊，確保最佳使用體驗。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/011_tech-specs_.html" 
      title="技術規格 - WPS Office"
    />
  );
};

export default TechSpecs;
