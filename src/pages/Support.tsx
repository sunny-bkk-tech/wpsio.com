import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Support: React.FC = () => {
  useSEO({
    title: 'WPS Office帮助中心 - 使用教程/常见问题/技术支持',
    description: 'WPS Office官方帮助与技术支持中心，提供详细使用教程指南、视频演示教学、常见问题FAQ解答、在线技术支持服务。快速解决软件安装部署、激活授权、文档编辑排版、格式转换导出、云同步备份、打印设置配置等各类问题。提供7×24小时在线客服和电话技术支持，让您无忧使用WPS，高效提升办公效率！',
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