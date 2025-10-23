import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const TechSpecs: React.FC = () => {
  useSEO({
    title: '技術規格 - WPS Office',
    description: '查看 WPS Office 詳細技術規格：系統需求（Windows 7+/macOS 11+/Linux/Android 5+/iOS 12+）、硬件配置（CPU、內存、磁盤空間）、支援平台架構（x86/x64/ARM）、文件格式兼容性、網絡要求、版本資訊、API接口、安全標準等完整技術文檔。確保最佳使用體驗和性能表現！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/011_tech-specs_.html" 
      title="技術規格 - WPS Office"
    />
  );
};

export default TechSpecs;
