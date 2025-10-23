import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const TermsOfUse: React.FC = () => {
  useSEO({
    title: '使用條款 - WPS Office',
    description: '閱讀 WPS Office 服務條款與使用規範，了解軟件授權協議、用戶權利與義務、禁止行為、知識產權、服務限制、免責聲明、爭議解決等法律條款。包含個人版、專業版、企業版的具體使用規定。適用於Windows、Mac、Linux、iOS、Android全平台。請仔細閱讀本條款，使用即表示同意！',
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
