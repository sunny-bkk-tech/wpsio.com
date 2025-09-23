import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Linux: React.FC = () => {
  useSEO({
    title: 'WPS Office for Linux - Linux版辦公軟體',
    description: '下載 WPS Office Linux 版本，支援主流發行版，提供穩定且高效的辦公體驗。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/004_office_linux_.html" 
      title="WPS Office for Linux - Linux版辦公軟體"
    />
  );
};

export default Linux;
