import React from 'react';
import HTMLViewer from '../components/HTMLViewer';

const Spreadsheet: React.FC = () => {
  return (
    <HTMLViewer 
      htmlPath="wps_full_site/019_office_spreadsheet_.html" 
      title="WPS Spreadsheet - 專業試算表軟體"
    />
  );
};

export default Spreadsheet;
