export const extractStaticContent = (htmlContent: string): string => {
  let processedContent = htmlContent;
  
  // Only remove script tags that contain iframe detection or content clearing
  processedContent = processedContent.replace(
    /<script[^>]*>[\s\S]*?<\/script>/gi,
    (match) => {
      // Check if script contains problematic code
      if (match.includes('window.top') || 
          match.includes('window.parent') || 
          match.includes('top !==') || 
          match.includes('parent !==') ||
          match.includes('location.replace') ||
          match.includes('document.write') ||
          match.includes('innerHTML') ||
          match.includes('body.innerHTML') ||
          match.includes('iframe') ||
          match.includes('frame')) {
        console.log('Removed problematic script');
        return '<!-- Problematic script removed -->';
      }
      return match; // Keep other scripts
    }
  );
  
  // Remove only JavaScript event handlers, not all attributes
  processedContent = processedContent.replace(
    /\s*on\w+\s*=\s*["']javascript:[^"']*["']/gi,
    ''
  );
  
  // Convert javascript: hrefs to # but keep other hrefs
  processedContent = processedContent.replace(
    /href\s*=\s*["']javascript:[^"']*["']/gi,
    'href="#"'
  );
  
  // Add minimal iframe protection without breaking layout
  const iframeProtection = `
    <script>
      // Minimal iframe protection
      try {
        if (window.top !== window) {
          // Override problematic methods
          location.replace = function() { console.log('Prevented location.replace'); };
          document.write = function() { console.log('Prevented document.write'); };
        }
      } catch(e) {}
    </script>
  `;
  
  // Replace external URLs with local paths
  processedContent = processedContent.replace(/https:\/\/zh-hant\.wps\.com\//g, '/');
  processedContent = processedContent.replace(/https:\/\/website-prod\.cache\.wpscdn\.com\/img\//g, '/wps_full_site/');
  processedContent = processedContent.replace(/https:\/\/www\.wps\.com\//g, '/');
  processedContent = processedContent.replace(/https:\/\/wdl1\.pcfg\.cache\.wpscdn\.com\//g, '/wps_full_site/');
  processedContent = processedContent.replace(/https:\/\/help\.wps\.com\//g, '/');
  
  // Fix specific image naming issues
  processedContent = processedContent.replace(/Left@2x\.dfcb28b\.png/g, 'Left_2x.dfcb28b.png');
  processedContent = processedContent.replace(/Left@1x\.cefd270\.png/g, 'Left_2x.dfcb28b.png'); // Use 2x as fallback for 1x
  
  // Add base tag to ensure relative URLs work
  if (!processedContent.includes('<base href=')) {
    processedContent = processedContent.replace(/<head>/i, '<head><base href="/wps_full_site/">');
  }
  
  // Insert protection before closing head tag
  processedContent = processedContent.replace(
    /<\/head>/i,
    iframeProtection + '</head>'
  );
  
  return processedContent;
};
