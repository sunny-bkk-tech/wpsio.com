import React, { useState, useEffect, useRef } from 'react';
import { extractStaticContent } from '../utils/staticContentExtractor';

interface WPSViewerProps {
  htmlPath: string;
  title?: string;
}

const WPSViewer: React.FC<WPSViewerProps> = ({ htmlPath, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/${htmlPath}`);
        const html = await response.text();
        
        // Extract static content by removing all JavaScript
        let processedHtml = extractStaticContent(html);
        
        // Replace external URLs with local paths
        processedHtml = processedHtml.replace(/https:\/\/zh-hant\.wps\.com\//g, '/');
        processedHtml = processedHtml.replace(/https:\/\/website-prod\.cache\.wpscdn\.com\/img\//g, '/wps_full_site/');
        processedHtml = processedHtml.replace(/https:\/\/www\.wps\.com\//g, '/');
        processedHtml = processedHtml.replace(/https:\/\/wdl1\.pcfg\.cache\.wpscdn\.com\//g, '/wps_full_site/');
        processedHtml = processedHtml.replace(/https:\/\/help\.wps\.com\//g, '/');
        
        // Fix specific image naming issues
        processedHtml = processedHtml.replace(/Left@2x\.dfcb28b\.png/g, 'Left_2x.dfcb28b.png');
        processedHtml = processedHtml.replace(/Left@1x\.cefd270\.png/g, 'Left_2x.dfcb28b.png'); // Use 2x as fallback for 1x
        
        // Add base tag to ensure relative URLs work
        if (!processedHtml.includes('<base href=')) {
          processedHtml = processedHtml.replace(/<head>/i, '<head><base href="/wps_full_site/">');
        }
        
        setHtmlContent(processedHtml);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load page');
        setLoading(false);
      }
    };

    fetchContent();
  }, [htmlPath]);

  const handleIframeLoad = () => {
    console.log('WPS iframe loaded successfully');
    setLoading(false);
  };

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        color: '#e74c3c'
      }}>
        <h2>Error Loading Page</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '10px 20px',
            marginTop: '20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      position: 'relative',
      display: 'block'
    }}>
      <iframe
        ref={iframeRef}
        srcDoc={htmlContent}
        style={{
          width: '100%',
          height: '100vh',
          minHeight: '100vh',
          border: 'none',
          overflow: 'hidden',
          margin: 0,
          padding: 0,
          display: 'block',
          position: 'relative'
        }}
        title={title || 'WPS Content'}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-modals allow-downloads allow-orientation-lock allow-pointer-lock allow-presentation"
        onLoad={handleIframeLoad}
        onError={(e) => {
          console.error('Iframe failed to load:', e);
          setError('Failed to load page');
        }}
      />
      {loading && (
        <div style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: 10,
          fontSize: '18px',
          color: '#666'
        }}>
          Loading WPS content...
        </div>
      )}
    </div>
  );
};

export default WPSViewer;
