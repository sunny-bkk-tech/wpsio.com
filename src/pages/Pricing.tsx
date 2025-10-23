import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Pricing: React.FC = () => {
  useSEO({
    title: 'WPS Office价格方案 - 个人版/专业版/企业版套餐对比',
    description: 'WPS Office提供免费个人版、专业版（¥89/年）、企业版（¥199/年）、教育版等多种套餐定价方案。详细对比各版本核心功能差异、云存储空间容量、技术支持服务等级、授权用户数量。支持月付/年付/终身买断多种付款方式，企业批量采购享8折优惠折扣。立即查看详细价格表和最新优惠活动信息！',
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
