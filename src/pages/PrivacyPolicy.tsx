import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const PrivacyPolicy: React.FC = () => {
  return (
    <HTMLViewer 
      htmlPath="wps_full_site/015_privacy-policy_.html" 
      title="隱私政策 - WPS Office"
    />
  );
};

export default PrivacyPolicy;
