import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createScriptTag } from '../utils/scriptInjector';

interface HTMLViewerProps {
  htmlPath: string;
  title?: string;
}

const HTMLViewer: React.FC<HTMLViewerProps> = ({ htmlPath, title }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [htmlContent, setHtmlContent] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const navigate = useNavigate();

  // Listen for navigation and download messages from iframe
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      if (event.data && event.data.type === 'NAVIGATE') {
        const { path } = event.data;
        if (path && path !== window.location.pathname) {
          navigate(path);
        }
      } else if (event.data && event.data.type === 'DOWNLOAD_STARTED') {
        // Handle download started notification
        // You could show a loading indicator here if needed
      } else if (event.data && event.data.type === 'DOWNLOAD_FILE_DIRECT') {
        // Handle direct download for large files (more efficient)
        const { url, filename } = event.data;
        try {
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          link.style.display = 'none';
          // Add target="_blank" to force download in new tab if needed
          link.target = '_blank';

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          console.log(`File ${filename} downloaded successfully!`);
        } catch (error) {
          console.error('Error initiating direct download:', error);
        }
      } else if (event.data && event.data.type === 'DOWNLOAD_FILE') {
        // Handle download request from iframe (for smaller files)
        const { content, filename, isBinary } = event.data;
        try {
          let blob: Blob;
          
          if (isBinary && content.startsWith('data:')) {
            // Handle binary files (like .exe) sent as base64 data URLs
            const response = await fetch(content);
            blob = await response.blob();
          } else {
            // Handle text files
            blob = new Blob([content], { type: 'text/plain' });
          }
          
          const url = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = url;
          link.download = filename || 'download.txt';
          link.style.display = 'none';

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Clean up the URL object after a delay
          setTimeout(() => {
            URL.revokeObjectURL(url);
          }, 1000);

          console.log(`File ${filename} downloaded successfully from iframe!`);
        } catch (error) {
          console.error('Error downloading file from iframe:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  // Helper function to consolidate image path processing
  const processImagePaths = useCallback((html: string): string => {
    let processed = html;

    // Compute base directory of the provided htmlPath, e.g. wps_full_site/
    const baseDir = '/' + (htmlPath.split('/').slice(0, -1).join('/')) + '/';

    // Define Right_Pad images that should keep @ symbols
    const imagesWithAtSymbol = [
      'Right_Pad@2x.e814549.png',
      'Right_Pad@1x.7e0ccf3.png',
      'Right_Pad@3x.fa52a82.png'
    ];

    // Fix specific image paths with hardcoded replacements
    const imageReplacements = [
      // PDF Reader images
      [/src="PDF_Reader@2x\.404f2ec\.png"/g, 'src="/wps_full_site/PDF_Reader_2x.404f2ec.png"'],
      [/srcset="PDF_Reader@1x\.f841ae3\.png, PDF_Reader@2x\.404f2ec\.png 2x"/g, 'srcset="/wps_full_site/PDF_Reader@1x.f841ae3.png, /wps_full_site/PDF_Reader_2x.404f2ec.png 2x"'],

      // PDF Converter images
      [/src="https:\/\/website-prod\.cache\.wpscdn\.com\/img\/PDF_Converter@2x\.70c29d7\.png"/g, 'src="/wps_full_site/PDF_Converter_2x.70c29d7.png"'],
      [/srcset="https:\/\/website-prod\.cache\.wpscdn\.com\/img\/PDF_Converter@1x\.373bdd8\.png, https:\/\/website-prod\.cache\.wpscdn\.com\/img\/PDF_Converter@2x\.70c29d7\.png 2x"/g, 'srcset="/wps_full_site/PDF_Converter_2x.70c29d7.png, /wps_full_site/PDF_Converter_2x.70c29d7.png 2x"'],

      // PDF Fill & Sign images
      [/src="https:\/\/website-prod\.cache\.wpscdn\.com\/img\/PDF_Fill&amp;Sign@2x\.31386fc\.png"/g, 'src="/wps_full_site/PDF_Fill_Sign_2x.31386fc.png"'],
      [/srcset="https:\/\/website-prod\.cache\.wpscdn\.com\/img\/PDF_Fill&amp;Sign@1x\.a4925a3\.png, https:\/\/website-prod\.cache\.wpscdn\.com\/img\/PDF_Fill&amp;Sign@2x\.31386fc\.png 2x"/g, 'srcset="/wps_full_site/PDF_Fill_Sign_2x.31386fc.png, /wps_full_site/PDF_Fill_Sign_2x.31386fc.png 2x"'],
    ];

    // Apply hardcoded replacements
    imageReplacements.forEach(([pattern, replacement]) => {
      processed = processed.replace(pattern as RegExp, replacement as string);
    });

    // Convert external image URLs to local paths
    processed = processed.replace(/https:\/\/website-prod\.cache\.wpscdn\.com\/img\//g, '/wps_full_site/');

    // Fix images that start with / but should be in /wps_full_site/
    processed = processed.replace(/src="\/([^"]*\.(png|jpg|jpeg|svg|gif|webp))"/g, (match, filename) => {
      return match.startsWith('src="/wps_full_site/') ? match : `src="/wps_full_site/${filename}"`;
    });

    // Prefix relative image src (no leading / or http) with baseDir
    processed = processed.replace(/src="(?!https?:|\/)([^"\s]+\.(png|jpg|jpeg|svg|gif|webp))"/gi, (_: string, relPath: string) => {
      return `src="${baseDir}${relPath}"`;
    });

    // Handle @ symbols in image filenames - convert to underscores except for specific Right_Pad images
    processed = processed.replace(/src="\/wps_full_site\/([^"]*@[^"]*)"/g, (_: string, filename: string) => {
      if (imagesWithAtSymbol.includes(filename)) {
        return `src="/wps_full_site/${filename}"`;
      }
      const newFilename = filename.replace(/@/g, '_');
      return `src="/wps_full_site/${newFilename}"`;
    });

    // Unified Right_Pad path fixing - handles both @ and _ variants in src and srcset
    processed = processed.replace(/srcset="([^"]*Right_Pad[^"]*)"/g, (_: string, srcset: string) => {
      const fixed = srcset.replace(/(^|[,\s])\/?(Right_Pad[^,\s"]*\.png)/g, '$1/wps_full_site/$2');
      return `srcset="${fixed}"`;
    });

    // Ensure bare Right_Pad images get /wps_full_site/ prefix
    processed = processed.replace(/src="(Right_Pad[^"\s]*\.png)"/g, 'src="/wps_full_site/$1"');

    // Convert @ symbols to underscores in other srcset attributes
    processed = processed.replace(/srcset="([^"]*@[^"]*)"/g, (_: string, srcset: string) => {
      const newSrcset = srcset.replace(/@/g, '_');
      return `srcset="${newSrcset}"`;
    });

    // Ensure srcset relative URLs are prefixed with baseDir
    processed = processed.replace(/srcset="([^"]+)"/gi, (_: string, srcset: string) => {
      const fixed = srcset.replace(/(^|,\s*)(?!https?:|\/)([^,\s]+\.(png|jpg|jpeg|svg|gif|webp))(\s+\d+x)?/gi, (_m, p1, p2, p3) => {
        return `${p1}${baseDir}${p2}${p3 || ''}`;
      });
      return `srcset="${fixed}"`;
    });

    // Rewrite <link rel="stylesheet" href="..."> to absolute paths so styles load inside srcDoc
    // Prefix relative href (no leading / or http) with baseDir
    processed = processed.replace(/<link([^>]*?)href="(?!https?:|\/)([^"\s>]+)"/gi, (_: string, attrs: string, href: string) => {
      return `<link${attrs}href="${baseDir}${href}"`;
    });
    // Fix hrefs that start with / but are not under /wps_full_site/ or /assets
    processed = processed.replace(/<link([^>]*?)href="\/([^"\s>]+)"/gi, (_: string, attrs: string, path: string) => {
      if (path.startsWith('wps_full_site/') || path.startsWith('assets/') || path.startsWith('favicon') || path.startsWith('robots.txt')) {
        return `<link${attrs}href="/${path}"`;
      }
      return `<link${attrs}href="/wps_full_site/${path}"`;
    });

    return processed;
  }, [htmlPath]);

  // Helper function to disable event handlers
  const disableEventHandlers = (html: string): string => {
    const eventHandlers = [
      /onclick\s*=\s*["'][^"']*["']/gi,
      /onload\s*=\s*["'][^"']*["']/gi,
      /onmousedown\s*=\s*["'][^"']*["']/gi,
      /onmouseup\s*=\s*["'][^"']*["']/gi
    ];

    let processed = html;
    eventHandlers.forEach(pattern => {
      processed = processed.replace(pattern, '');
    });

    return processed;
  };

  // Helper function to block downloads and problematic URLs
  const blockDownloads = (html: string): string => {
    let processed = html;

    // Block .exe file references
    const exePatterns = [
      /href\s*=\s*["'][^"']*\.exe[^"']*["']/gi,
      /src\s*=\s*["'][^"']*\.exe[^"']*["']/gi,
      /action\s*=\s*["'][^"']*\.exe[^"']*["']/gi
    ];

    exePatterns.forEach(pattern => {
      processed = processed.replace(pattern, 'href="#"');
    });

    // Block WPS download URLs
    const wpsDownloadPatterns = [
      /https:\/\/wdl1\.pcfg\.cache\.wpscdn\.com\/wpsdl\/wpsoffice\/onlinesetup\/distsrc\/[^/]+\/wpsinst\/wps_office_inst\.exe/gi,
      /wdl1\.pcfg\.cache\.wpscdn\.com\/wpsdl\/wpsoffice\/onlinesetup/gi,
      /wpsdl\/wpsoffice\/onlinesetup/gi,
      /onlinesetup\/distsrc/gi
    ];

    wpsDownloadPatterns.forEach(pattern => {
      processed = processed.replace(pattern, 'blocked-wps-download');
    });

    // Block meta refresh and form actions
    processed = processed.replace(/<meta[^>]*http-equiv\s*=\s*["']refresh["'][^>]*>/gi, '');
    processed = processed.replace(/<form[^>]*action\s*=\s*["'][^"']*\.exe[^"']*["'][^>]*>/gi, '<form action="#"');

    return processed;
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Fetch the HTML content directly from public directory
        const response = await fetch(`/${htmlPath}`);
        const html = await response.text();

        // Process the HTML to remove problematic scripts and fix URLs
        let processedHtml = html;
        
        // Remove ALL script tags to prevent any JavaScript execution
        processedHtml = processedHtml.replace(
          /<script[^>]*>[\s\S]*?<\/script>/gi,
          '<!-- Script removed for iframe compatibility -->'
        );
        
        // Also remove any remaining script references
        processedHtml = processedHtml.replace(
          /<script[^>]*\/>/gi,
          '<!-- Script removed for iframe compatibility -->'
        );
        
        // Process image paths using helper function
        processedHtml = processImagePaths(processedHtml);

        // Disable event handlers using helper function
        processedHtml = disableEventHandlers(processedHtml);

        // Remove iframe busting and CSP meta tags
        processedHtml = processedHtml.replace(/<meta[^>]*http-equiv=["']X-Frame-Options["'][^>]*>/gi, '');
        processedHtml = processedHtml.replace(/<meta[^>]*content=["']frame-ancestors\s*none["'][^>]*>/gi, '');
        processedHtml = processedHtml.replace(/<meta[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/gi, '');
        processedHtml = processedHtml.replace(/<meta[^>]*http-equiv=["']content-security-policy["'][^>]*>/gi, '');
        processedHtml = processedHtml.replace(/<meta[^>]*name=["']Content-Security-Policy["'][^>]*>/gi, '');
        processedHtml = processedHtml.replace(/<meta[^>]*name=["']content-security-policy["'][^>]*>/gi, '');

        // Replace external URLs with local paths using array-based approach
        const urlReplacements = [
          [/https:\/\/zh-hant\.wps\.com\//g, '/'],
          [/https:\/\/website-prod\.cache\.wpscdn\.com\/img\//g, '/wps_full_site/'],
          [/https:\/\/website-prod\.cache\.wpscdn\.com\//g, '/wps_full_site/'],
          [/https:\/\/abroadad\.cache\.wpscdn\.com\/app\/shopwindow\/[^/]+\//g, '/wps_full_site/'],
          [/https:\/\/abroadad\.cache\.wpscdn\.com\/upload\/ad_adapter\/[^/]+\//g, '/wps_full_site/'],
          [/https:\/\/abroadad\.cache\.wpscdn\.com\//g, '/wps_full_site/'],
          [/https:\/\/www\.wps\.com\//g, '/'],
          [/https:\/\/wdl1\.pcfg\.cache\.wpscdn\.com\//g, '/wps_full_site/'],
          [/https:\/\/help\.wps\.com\//g, '/']
        ];

        urlReplacements.forEach(([pattern, replacement]) => {
          processedHtml = processedHtml.replace(pattern as RegExp, replacement as string);
        });

        // Process CSS background-image URLs
        processedHtml = processedHtml.replace(
          /background-image:\s*url\(([^)]+)\)/g,
          (match: string, url: string) => {
            // Remove quotes from URL if present
            const cleanUrl = url.replace(/^["']|["']$/g, '');
            // Convert external WPS CDN URLs to local paths
            if (cleanUrl.includes('website-prod.cache.wpscdn.com')) {
              const localUrl = cleanUrl.replace('https://website-prod.cache.wpscdn.com/img/', '/wps_full_site/');
              return `background-image:url(${localUrl})`;
            }
            // Prefix relative CSS url(...) with baseDir
            if (!/^https?:\/\//i.test(cleanUrl) && !cleanUrl.startsWith('/')) {
              return `background-image:url(${`/${htmlPath.split('/').slice(0, -1).join('/')}/${cleanUrl}`})`;
            }
            return match;
          }
        );
        
        
        // Block downloads using helper function
        processedHtml = blockDownloads(processedHtml);
        

        // Fix specific image naming issues
        processedHtml = processedHtml.replace(/Left@2x\.dfcb28b\.png/g, 'Left_2x.dfcb28b.png');
        processedHtml = processedHtml.replace(/Left@1x\.cefd270\.png/g, 'Left_2x.dfcb28b.png'); // Use 2x as fallback for 1x
        
        
        // Fix broken Microsoft Office compatibility image
        processedHtml = processedHtml.replace(/wps-office-compatible-with-microsoft-office-2x\.3501bd1\.png/g, 'Compatible_with_Various_File_Formats.05add01.png');
        
        // Fix broken sharing and editing image
        processedHtml = processedHtml.replace(/share-exce-word-ppt-and-pdf-for-editing-2x\.cdbfc44\.png/g, 'Files_Management_Across_Devices.6f009ba.png');
        
        // Fix broken office software image
        processedHtml = processedHtml.replace(/free-office-software-for-microsoft-word-excel-powerpoint-2x\.a5f304c\.png/g, 'Excellent_Productivity_Application.3beaf12.png');
        
        // Fix broken document processing image
        processedHtml = processedHtml.replace(/fast-document-processing-in-wps-office-2x\.4bef94b\.png/g, 'smart-photo-editing-2x.dba216b.png');
        
        
        // Remove automatic download triggers (but keep manual download links)
        processedHtml = processedHtml.replace(/download="[^"]*"/gi, ''); // Remove auto-download attributes

        // Remove any iframe or script that might trigger automatic downloads
        processedHtml = processedHtml.replace(/<iframe[^>]*wps_office_inst[^>]*>[\s\S]*?<\/iframe>/gi, '<!-- Auto-download iframe removed -->');
        processedHtml = processedHtml.replace(/<script[^>]*wps_office_inst[^>]*>[\s\S]*?<\/script>/gi, '<!-- Auto-download script removed -->');

        // Block additional JavaScript download patterns
        const jsDownloadPatterns = [
          /window\.location\.href\s*=\s*["'][^"']*\.exe["']/gi,
          /location\.href\s*=\s*["'][^"']*\.exe["']/gi,
          /window\.open\s*\(\s*["'][^"']*\.exe["']/gi
        ];

        jsDownloadPatterns.forEach(pattern => {
          processedHtml = processedHtml.replace(pattern, '// Auto-download blocked');
        });

        // Block remaining WPS download patterns
        const wpsPatterns = [
          [/wps_office_inst/gi, 'wps_office_blocked'],
          [/wpsoffice\/onlinesetup/gi, 'wpsoffice/blocked'],
          [/distsrc\/[^/]+\/wpsinst/gi, 'blocked/blocked']
        ];

        wpsPatterns.forEach(([pattern, replacement]) => {
          processedHtml = processedHtml.replace(pattern as RegExp, replacement as string);
        });

        // Do not inject a <base> tag. Injecting a base to /wps_full_site/ caused
        // app assets like /assets/index-*.css to resolve under /wps_full_site/assets
        // leading to 404s and MIME type text/html. We rely on explicit URL rewrites above instead.

        // Fix mobile navigation - add missing hamburger menu button and main menu
        // Only add left section if it doesn't already exist
        if (!processedHtml.includes('class="left"')) {
          processedHtml = processedHtml.replace(
            /<div data-v-527dfb55="" class="center">/g,
            '<div data-v-527dfb55="" class="left"><div data-v-527dfb55="" class="menu-icon" onclick="toggleMobileMenu()"></div></div><div data-v-527dfb55="" class="center">'
          );
        }
        
        // Add the missing main-menu element
        processedHtml = processedHtml.replace(
          /<div data-v-527dfb55="" data-v-126c79c2="" class="mobile-menu-container dark">/g,
          '<div data-v-527dfb55="" data-v-126c79c2="" class="mobile-menu-container dark"><div data-v-527dfb55="" class="main-menu"><div data-v-527dfb55="" class="menu-list"><div data-v-527dfb55="" class="menu"><a data-v-527dfb55="" href="/about" class="menu-name">關於我們</a></div><div data-v-527dfb55="" class="menu"><a data-v-527dfb55="" href="/download" class="menu-name">下載</a></div><div data-v-527dfb55="" class="menu"><a data-v-527dfb55="" href="/pricing" class="menu-name">定價</a></div><div data-v-527dfb55="" class="menu"><a data-v-527dfb55="" href="/education" class="menu-name">資源</a></div><div data-v-527dfb55="" class="menu"><a data-v-527dfb55="" href="/support" class="menu-name">支援</a></div></div></div>'
        );

        // Add mobile menu CSS fixes
        const mobileMenuCSS = `
        <style>
        /* Mobile menu fixes */
        .mobile-menu-container .main-menu {
          display: none;
          position: fixed;
          top: 62px;
          left: 0;
          right: 0;
          bottom: 0;
          background: #fff;
          z-index: 1000;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
          overflow-y: auto;
        }
        
        .mobile-menu-container .main-menu.show {
          display: block;
          transform: translateX(0);
        }
        
        .mobile-menu-container .mobile-header .left {
          display: flex;
          align-items: center;
          padding-left: 16px;
        }
        
        .mobile-menu-container .mobile-header .left .menu-icon {
          width: 24px;
          height: 24px;
          background-image: url(wps_full_site/header_M_nav.3fb56b8.svg);
          background-position: 50%;
          background-repeat: no-repeat;
          background-size: contain;
          cursor: pointer;
        }
        
        .mobile-menu-container .mobile-header .left .menu-icon:hover {
          opacity: 0.7;
        }
        
        .mobile-menu-container .main-menu .menu-list .menu {
          border-bottom: 1px solid #ebecee;
        }
        
        .mobile-menu-container .main-menu .menu-list .menu .menu-name {
          display: block;
          padding: 16px;
          color: #000;
          text-decoration: none;
          font-weight: 700;
          font-size: 16px;
        }
        
        .mobile-menu-container .main-menu .menu-list .menu .menu-name:hover {
          background: rgba(64,72,115,.05);
        }
        </style>
        `;
        
        processedHtml = processedHtml.replace(/<\/head>/i, mobileMenuCSS + '</head>');
        
        // Use external script utilities
        const injectedScript = createScriptTag();
        
        // Insert the injected script before closing head tag
        processedHtml = processedHtml.replace(/<\/head>/i, injectedScript + '</head>');

        // No protection script needed since we removed all scripts

        setHtmlContent(processedHtml);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError('Failed to load page');
        setLoading(false);
      }
    };

    fetchContent();
  }, [htmlPath, processImagePaths]);

  // Force iframe update when htmlContent changes
  useEffect(() => {
    if (iframeRef.current && htmlContent) {
      // Use srcDoc directly
      iframeRef.current.srcdoc = htmlContent;
    }
  }, [htmlContent]);

  const handleIframeLoad = () => {
    // Iframe loaded successfully
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
      {htmlContent && (
        <iframe
          ref={iframeRef}
          key={htmlPath} // Force re-render when htmlPath changes
          srcDoc={htmlContent}
          style={{
            width: '100%',
            height: '100vh',
            minHeight: '100vh',
            border: 'none',
            overflow: 'auto',
            margin: 0,
            padding: 0,
            display: 'block',
            position: 'relative'
          }}
          title={title || 'WPS Content'}
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation allow-modals allow-orientation-lock allow-pointer-lock allow-presentation"
          allow="fullscreen"
          onLoad={handleIframeLoad}
          onError={(e) => {
            console.error('Iframe failed to load:', e);
            setError('Failed to load page');
          }}
        />
      )}
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
          Loading...
        </div>
      )}
    </div>
  );
};

export default HTMLViewer;