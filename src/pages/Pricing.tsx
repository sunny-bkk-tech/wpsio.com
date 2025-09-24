import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Pricing: React.FC = () => {
  useSEO({
    title: 'WPS Office 定價 - 選擇最適合您的方案',
    description: '比較 WPS Office 的各項方案與功能，選擇符合個人、團隊或企業需求的訂閱選項。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/014_pricing_chinese.html" 
      title="WPS Office 定價 - 選擇最適合您的方案"
    />
  );
};

export default Pricing;
