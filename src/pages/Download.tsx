import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Download: React.FC = () => {
  useSEO({
    title: '免费下载适用于 Windows、Mac 和 Linux 的 WPS Office',
    description: '免费下载 WPS Office 中文版，支持 Windows、Mac 与移动端。轻松编辑 Word、Excel、PPT，高效便捷的一体化办公套件'
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/012_download_.html" 
      title="下載 WPS Office - 免費Office下載"
    />
  );
};

export default Download;