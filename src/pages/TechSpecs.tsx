import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const TechSpecs: React.FC = () => {
  return (
    <HTMLViewer 
      htmlPath="wps_full_site/011_tech-specs_.html" 
      title="技術規格 - WPS Office"
    />
  );
};

export default TechSpecs;
