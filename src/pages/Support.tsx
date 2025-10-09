import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Support: React.FC = () => {
  useSEO({
    title: 'WPS Office帮助中心 - 使用教程/常见问题/技术支持',
    description: 'WPS Office官方帮助中心，提供详细使用教程、常见问题解答、技术支持服务。快速解决安装激活、文档编辑、格式转换、云同步等问题。7×24小时在线客服，让您无忧使用WPS！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/support',
    locale: 'zh_CN'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/010_support_.html" 
      title="技術支援 - WPS Office"
    />
  );
};

export default Support;