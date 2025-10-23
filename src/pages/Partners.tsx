import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Partners: React.FC = () => {
  useSEO({
    title: '合作夥伴與客戶故事 - WPS Office',
    description: '了解 WPS Office 的全球合作夥伴生態系統網絡與企業客戶成功應用案例故事。涵蓋政府機關部門、世界500強企業集團、高等教育機構、中小型企業的數字化辦公轉型歷程。通過雲辦公平台和協作工具解決方案，助力不同行業領域提升辦公效率、降低IT運營成本、實現業務流程創新優化。查看真實客戶評價反饋和ROI投資回報數據分析！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/005_partnership-customer-stories_.html" 
      title="合作夥伴與客戶故事 - WPS Office"
    />
  );
};

export default Partners;
