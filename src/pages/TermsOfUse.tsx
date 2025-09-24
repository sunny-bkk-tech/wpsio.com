import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const TermsOfUse: React.FC = () => {
  useSEO({
    title: '使用條款 - WPS Office',
    description: '閱讀 WPS Office 的服務條款與使用規範，了解您的權利與義務。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/025_terms-of-use_.html" 
      title="使用條款 - WPS Office"
    />
  );
};

export default TermsOfUse;
