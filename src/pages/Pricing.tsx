import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const Pricing: React.FC = () => {
  return (
    <HTMLViewer 
      htmlPath="wps_full_site/014_pricing_chinese.html" 
      title="WPS Office 定價 - 選擇最適合您的方案"
    />
  );
};

export default Pricing;
