import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const PDF: React.FC = () => {
  useSEO({
    title: 'WPS PDF - 專業PDF編輯軟體',
    description: '以 WPS PDF 編輯、轉換與標註 PDF 文件，提升文檔處理效率。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/017_office_pdf_.html" 
      title="WPS PDF - 專業PDF編輯軟體"
    />
  );
};

export default PDF;
