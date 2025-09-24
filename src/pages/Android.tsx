import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Android: React.FC = () => {
  useSEO({
    title: 'WPS Office for Android - Android版辦公軟體',
    description: '在 Android 裝置上使用 WPS Office，隨時隨地查看、編輯與分享文檔。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/003_office_android_.html" 
      title="WPS Office for Android - Android版辦公軟體"
    />
  );
};

export default Android;
