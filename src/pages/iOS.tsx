import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const IOS: React.FC = () => {
  useSEO({
    title: 'WPS Office for iOS - iOS版辦公軟體',
    description: '在 iPhone 和 iPad 上使用 WPS Office，高效處理文檔、表格與簡報。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/021_office_ios_.html" 
      title="WPS Office for iOS - iOS版辦公軟體"
    />
  );
};

export default IOS;
