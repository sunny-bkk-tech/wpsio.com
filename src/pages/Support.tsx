import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Support: React.FC = () => {
  useSEO({
    title: '技術支援 - WPS Office',
    description: '獲取 WPS Office 使用幫助、常見問題解答與技術支援，快速解決安裝、啟用、功能使用等問題。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/010_support_.html" 
      title="技術支援 - WPS Office"
    />
  );
};

export default Support;