import React from 'react';
import HTMLViewer from '../components/HTMLViewer';
import { useSEO } from '../utils/useSEO';

const Home: React.FC = () => {
  useSEO({
    title: '最佳WPS Office中文官方网站',
    description: '免费下载最新版本的 WPS Office，提升办公效率。兼容 Windows、Mac 和 Linux，轻松完成各类办公任务。',
    robots: 'index,follow',
    image: 'https://www.wpsio.com/vite.svg',
    locale: 'zh_TW',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'WPS-IO Office',
      url: 'https://www.wpsio.com/',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://www.wpsio.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  });

  return (
    <HTMLViewer 
      htmlPath="wps_full_site/001_index.html" 
      title="WPS Office - AI驅動的辦公套件"
    />
  );
};

export default Home;