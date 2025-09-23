import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Presentation: React.FC = () => {
  useSEO({
    title: 'WPS Presentation - 專業簡報製作軟體',
    description: '使用 WPS Presentation 設計精美簡報，提供豐富模板與動畫，輕鬆打造專業展示。'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/016_office_presentation_.html" 
      title="WPS Presentation - 專業簡報製作軟體"
    />
  );
};

export default Presentation;
