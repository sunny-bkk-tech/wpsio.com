export const processWPSContent = (htmlContent: string): string => {
  let processedContent = htmlContent;
  
  // Remove all script tags that might contain anti-iframe code
  processedContent = processedContent.replace(
    /<script[^>]*>[\s\S]*?<\/script>/gi,
    (match) => {
      // Check if script contains iframe detection
      if (match.includes('window.top') || 
          match.includes('window.parent') || 
          match.includes('top !==') || 
          match.includes('parent !==') ||
          match.includes('location.replace') ||
          match.includes('document.write') ||
          match.includes('innerHTML') ||
          match.includes('body.innerHTML')) {
        console.log('Removed anti-iframe script');
        return '<!-- Removed anti-iframe script -->';
      }
      return match;
    }
  );
  
  // Remove specific problematic patterns
  const problematicPatterns = [
    // Iframe detection
    /if\s*\(\s*window\.top\s*!==\s*window\s*\)/g,
    /if\s*\(\s*window\.parent\s*!==\s*window\s*\)/g,
    /if\s*\(\s*top\s*!==\s*self\s*\)/g,
    /if\s*\(\s*parent\s*!==\s*self\s*\)/g,
    /window\.top\s*!==\s*window/g,
    /window\.parent\s*!==\s*window/g,
    /top\s*!==\s*self/g,
    /parent\s*!==\s*self/g,
    
    // Content clearing
    /location\.replace\s*\([^)]*\)/g,
    /document\.write\s*\([^)]*\)/g,
    /document\.body\.innerHTML\s*=\s*['""][^'"]*['""]/g,
    /document\.body\.innerHTML\s*=\s*`[^`]*`/g,
    
    // Navigation prevention
    /window\.location\.href\s*=/g,
    /window\.location\.replace\s*\(/g,
    /window\.location\.assign\s*\(/g,
  ];
  
  problematicPatterns.forEach(pattern => {
    processedContent = processedContent.replace(pattern, 'console.log("Prevented iframe restriction")');
  });
  
  // Add comprehensive iframe protection script
  const iframeScript = `
    <script>
      console.log('WPS iframe protection loaded');
      
      // Override iframe detection
      try {
        Object.defineProperty(window, 'top', {
          get: function() { return window; },
          configurable: true
        });
        Object.defineProperty(window, 'parent', {
          get: function() { return window; },
          configurable: true
        });
        Object.defineProperty(window, 'self', {
          get: function() { return window; },
          configurable: true
        });
      } catch(e) {
        console.log('Could not override window properties:', e);
      }
      
      // Override location methods
      const originalReplace = location.replace;
      location.replace = function() {
        console.log('Prevented location.replace');
        return;
      };
      
      const originalAssign = location.assign;
      location.assign = function() {
        console.log('Prevented location.assign');
        return;
      };
      
      // Override document methods
      const originalWrite = document.write;
      document.write = function() {
        console.log('Prevented document.write');
        return;
      };
      
      // Override innerHTML for body
      const bodyElement = document.body;
      if (bodyElement) {
        const originalInnerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
        Object.defineProperty(bodyElement, 'innerHTML', {
          set: function(value) {
            if (value.length < 100) {
              console.log('Prevented body content clearing');
              return;
            }
            originalInnerHTML.set.call(this, value);
          },
          get: originalInnerHTML.get
        });
      }
      
      // Override window.location.href
      try {
        Object.defineProperty(window.location, 'href', {
          set: function(value) {
            console.log('Prevented location.href change');
            return;
          },
          get: function() {
            return window.location.origin + window.location.pathname;
          }
        });
      } catch(e) {
        console.log('Could not override location.href:', e);
      }
      
      // Monitor for content clearing attempts
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.target === document.body) {
            if (document.body.children.length === 0) {
              console.log('Detected content clearing attempt, preventing...');
              setTimeout(() => {
                if (document.body.children.length === 0) {
                  console.log('Content was cleared, reloading...');
                  location.reload();
                }
              }, 100);
            }
          }
        });
      });
      
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      }
      
      console.log('WPS iframe protection completed');
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
  
  // Insert the iframe script before closing head tag
  processedContent = processedContent.replace(
    /<\/head>/i,
    iframeScript + '</head>'
  );
  
  return processedContent;
};
