import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Spreadsheet: React.FC = () => {
  useSEO({
    title: 'WPS表格 - 免费Excel电子表格编辑器 | 兼容XLS/XLSX',
    description: 'WPS表格是专业的电子表格分析工具，完美兼容Microsoft Excel（XLS/XLSX/CSV）。内置500+常用函数公式、数据透视表、高级图表、条件格式、宏编程VBA等强大功能。支持百万行数据处理、实时多人协作编辑、智能填充、数据验证、筛选排序。提供财务、统计、工程等专业模板，让数据分析更简单高效！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    canonical: 'https://www.wpsio.com/spreadsheet',
    locale: 'zh_CN',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'WPS Spreadsheet',
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Spreadsheet',
      operatingSystem: 'Windows, macOS, Linux, Android, iOS',
      description: '免费电子表格编辑器，兼容Microsoft Excel，支持XLS、XLSX格式',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'CNY'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/019_office_spreadsheet_.html" 
      title="WPS Spreadsheet - 專業試算表軟體"
    />
  );
};

export default Spreadsheet;
