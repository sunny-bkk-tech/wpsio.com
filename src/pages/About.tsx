import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const About: React.FC = () => {
  return (
    <HTMLViewer 
      htmlPath="wps_full_site/007_about-us_.html" 
      title="關於 WPS Office - 我們的使命、歷史和社會責任"
    />
  );
};

export default About;