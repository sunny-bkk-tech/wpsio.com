import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Spreadsheet: React.FC = () => {
  useSEO({
    title: 'WPS表格 - 免费Excel电子表格编辑器 | 兼容XLS/XLSX',
    description: 'WPS表格是专业的电子表格工具，完美兼容Microsoft Excel（XLS/XLSX）。提供丰富函数公式、数据透视表、图表分析、宏编程等功能。支持多人协作、云端同步，让数据处理更简单高效！',
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
