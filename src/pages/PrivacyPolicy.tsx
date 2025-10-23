import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const PrivacyPolicy: React.FC = () => {
  useSEO({
    title: '隱私政策 - WPS Office',
    description: '瞭解 WPS Office 隱私保護政策，詳細說明個人資訊收集、使用、存儲、共享與保護方式。我們採用銀行級加密技術、GDPR合規處理、數據最小化原則，確保用戶隱私安全。包括Cookie政策、第三方服務、數據刪除權利、安全措施等完整條款。透明公開的隱私政策，讓您放心使用 WPS Office 辦公軟件服務！',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/015_privacy-policy_.html" 
      title="隱私政策 - WPS Office"
    />
  );
};

export default PrivacyPolicy;
