/**
 * Router handlers for HTMLViewer
 * Intercepts HTML links and routes them through React Router
 */

export const routerHandlersScript = `
// Router handlers: intercept HTML links and route through React Router
function setupRouterHandlers() {
  try {
    // Get the parent window (the React app window)
    const parentWindow = window.parent;
    
    // Check if we're in an iframe and parent has React Router
    if (parentWindow && parentWindow.location && parentWindow !== window) {
      
      // Intercept all link clicks
      document.addEventListener('click', function(e) {
        const target = e.target;
        if (!target) return;
        
        // Find the closest link element
        const link = target.closest('a');
        if (!link || !link.href) return;
        
        // Check if it's an internal link (not external)
        let url;
        let currentOrigin;
        
        try {
          // Try to get origin from window.location
          currentOrigin = window.location.origin;
          url = new URL(link.href, currentOrigin);
        } catch (err) {
          // Fallback: use parent window's origin or construct from href
          try {
            currentOrigin = window.parent.location.origin;
            url = new URL(link.href, currentOrigin);
          } catch (err2) {
            // Last fallback: try to construct URL directly
            url = new URL(link.href);
            currentOrigin = url.origin;
          }
        }
        
        // Only handle internal links
        if (url.origin === currentOrigin) {
          e.preventDefault();
          e.stopPropagation();

          const pathname = url.pathname;
          // Check if this is a home page link with specific menu titles
          const menuTitle = link.getAttribute('title');
          const menuText = link.textContent?.trim() || '';
          const menuClass = link.querySelector('.menu-name')?.className || '';
          
          let reactRoute;
          
          // Special handling for menu items that point to home but should go to specific pages
          if ((menuTitle === '資源' || menuText === '資源' || menuClass.includes('ow_learn')) && pathname === '/') {
            reactRoute = '/education';
          } else if ((menuTitle === '支援' || menuText === '支援' || menuClass.includes('ow_support')) && pathname === '/') {
            reactRoute = '/support';
          } else {
            // Map HTML file to React route
            reactRoute = mapToReactRoute(pathname);
          }

          // Send message to parent window to navigate
          try {
            parentWindow.postMessage({
              type: 'NAVIGATE',
              path: reactRoute,
              originalPath: pathname
            }, '*');
          } catch (err) {
            // Fallback: direct navigation
            parentWindow.location.href = reactRoute;
          }

          return false;
        } else {
          // Handle external links that point to the same domain but different origin
          // This handles cases like https://zh-hant.wps.com/ -> localhost:8080/
          if (url.hostname === 'zh-hant.wps.com' || url.hostname === 'www.wps.com') {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if this is a specific menu item that should map to a specific route
            const menuTitle = link.getAttribute('title');
            const menuClass = link.querySelector('.menu-name')?.className || '';
            const menuText = link.textContent?.trim() || '';
            
            let reactRoute;
            
            // Map specific menu items by title, class, or text content
            if (menuTitle === '資源' || menuClass.includes('ow_learn') || menuText === '資源') {
              reactRoute = '/education';
            } else if (menuTitle === '支援' || menuClass.includes('ow_support') || menuText === '支援') {
              reactRoute = '/support';
            } else {
              // Map external WPS links to local routes
              reactRoute = mapExternalWpsLink(url.pathname);
            }

            // Send message to parent window to navigate
            try {
              parentWindow.postMessage({
                type: 'NAVIGATE',
                path: reactRoute,
                originalPath: url.pathname,
                isExternal: true
              }, '*');
            } catch (err) {
              // Fallback: direct navigation
              parentWindow.location.href = reactRoute;
            }

            return false;
          }
        }
      }, true);
      
    }
  } catch (err) {
    // Router handlers setup error
  }
}

// URL mapping for static HTML files to React routes
const routeMapping = {
  // Home page
  '/': '/',
  '/index.html': '/',
  '/001_index.html': '/',
  
  // Main pages
  '/007_about-us_.html': '/about',
  '/012_download_.html': '/download',
  '/014_pricing_.html': '/pricing',
  '/014_pricing_chinese.html': '/pricing',
  '/010_support_.html': '/support',
  '/002_education_.html': '/education',
  
  // Add trailing slash variations
  '/pricing/': '/pricing',
  '/about/': '/about',
  '/download/': '/download',
  '/support/': '/support',
  '/education/': '/education',
  
  // Office apps
  '/008_office_writer_.html': '/writer',
  '/019_office_spreadsheet_.html': '/spreadsheet',
  '/016_office_presentation_.html': '/presentation',
  '/017_office_pdf_.html': '/pdf',
  
  // Platform pages
  '/020_office_windows_.html': '/windows',
  '/013_office_mac_.html': '/mac',
  '/003_office_android_.html': '/android',
  '/021_office_ios_.html': '/ios',
  '/004_office_linux_.html': '/linux',
  
  // Legal pages
  '/015_privacy-policy_.html': '/privacy-policy',
  '/025_terms-of-use_.html': '/terms-of-use',
  '/011_tech-specs_.html': '/tech-specs',
  '/005_partnership-customer-stories_.html': '/partners',
  
  // Additional mappings for common variations
  '/about.html': '/about',
  '/download.html': '/download',
  '/pricing.html': '/pricing',
  '/support.html': '/support',
  '/education.html': '/education',
  '/writer.html': '/writer',
  '/spreadsheet.html': '/spreadsheet',
  '/presentation.html': '/presentation',
  '/pdf.html': '/pdf',
  '/windows.html': '/windows',
  '/mac.html': '/mac',
  '/android.html': '/android',
  '/ios.html': '/ios',
  '/linux.html': '/linux',
  '/privacy-policy.html': '/privacy-policy',
  '/terms-of-use.html': '/terms-of-use',
  '/tech-specs.html': '/tech-specs',
  '/partners.html': '/partners'
};

// Function to map HTML file paths to React routes
function mapToReactRoute(htmlPath) {
  // Normalize path - remove trailing slash for consistent matching
  const normalizedPath = htmlPath.endsWith('/') && htmlPath !== '/' ? htmlPath.slice(0, -1) : htmlPath;
  
  // Try exact match first
  let mappedRoute = routeMapping[htmlPath] || routeMapping[normalizedPath];
  
  if (mappedRoute) {
    return mappedRoute;
  }
  
  // Try with filename only
  const filename = htmlPath.split('/').pop();
  mappedRoute = routeMapping[filename] || routeMapping['/' + filename];
  
  if (mappedRoute) {
    return mappedRoute;
  }
  
  // Default fallback - return the normalized path
  return normalizedPath;
}

// Function to map external WPS links to React routes
function mapExternalWpsLink(externalPath) {
  // Only map to pages that actually exist in the project
  // Based on the pages in /src/pages/ directory
  const externalMapping = {
    // Main navigation pages that exist
    '/': '/',
    '/download/': '/download',
    '/pricing/': '/pricing',
    '/about-us/': '/about',  // about-us -> about
    '/support/': '/support',
    '/education/': '/education',
    
    // Office apps that exist
    '/writer/': '/writer',
    '/spreadsheet/': '/spreadsheet', 
    '/presentation/': '/presentation',
    '/pdf/': '/pdf',
    
    // Platform pages that exist (from footer links)
    '/office/windows/': '/windows',
    '/office/mac/': '/mac',
    '/office/android/': '/android',
    '/office/ios/': '/ios',
    '/office/linux/': '/linux',
    
    // Legal pages that exist
    '/privacy-policy/': '/privacy-policy',
    '/terms-of-use/': '/terms-of-use',
    '/tech-specs/': '/tech-specs',
    '/strategic-partner/': '/partners',  // strategic-partner -> partners
    '/partners/': '/partners',
    
    // Additional mappings for common variations
    '/about/': '/about',
    '/download/': '/download',
    '/pricing/': '/pricing',
    '/support/': '/support',
    '/education/': '/education'
  };
  
  // Normalize path - remove trailing slash for consistent matching
  const normalizedPath = externalPath.endsWith('/') && externalPath !== '/' ? externalPath.slice(0, -1) : externalPath;
  
  // Try exact match first
  let mappedRoute = externalMapping[externalPath] || externalMapping[normalizedPath];
  
  if (mappedRoute) {
    return mappedRoute;
  }
  
  // For any other external links (like blog, academy, etc.), redirect to home
  return '/';
}

// Initialize router handlers when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupRouterHandlers);
} else {
  setupRouterHandlers();
}
`;
