import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Pricing: React.FC = () => {
  useSEO({
    title: 'WPS Office价格方案 - 个人版/专业版/企业版套餐对比',
    description: 'WPS Office提供免费个人版、专业版、企业版多种套餐方案。对比各版本功能差异，选择最适合您的订阅计划。支持月付/年付，企业批量采购享优惠。立即查看详细价格！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/pricing',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'WPS Office',
      description: 'WPS Office办公软件套餐',
      offers: [
        {
          '@type': 'Offer',
          name: '个人免费版',
          price: '0',
          priceCurrency: 'CNY'
        },
        {
          '@type': 'Offer',
          name: '专业版',
          price: '89',
          priceCurrency: 'CNY',
          priceValidUntil: '2025-12-31'
        }
      ]
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/014_pricing_chinese.html" 
      title="WPS Office 定價 - 選擇最適合您的方案"
    />
  );
};

export default Pricing;
