import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Partners: React.FC = () => {
  useSEO({
    title: '合作夥伴與客戶故事 - WPS Office',
    description: '了解 WPS Office 的合作夥伴與成功案例，探索我們如何助力企業與組織提升效率。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/005_partnership-customer-stories_.html" 
      title="合作夥伴與客戶故事 - WPS Office"
    />
  );
};

export default Partners;
