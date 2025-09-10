import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const Home: React.FC = () => {
  return (
    <HTMLViewer 
      htmlPath="wps_full_site/001_index.html" 
      title="WPS Office - AI驅動的辦公套件"
    />
  );
};

export default Home;