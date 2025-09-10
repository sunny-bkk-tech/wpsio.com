/**
 * Script injection utilities for HTMLViewer
 * Combines all handler scripts into a single injectable script
 */

import { downloadHandlersScript, downloadPreventionScript } from './downloadHandlers';
import { cookieHandlersScript } from './cookieHandlers';
import { modalHandlersScript } from './modalHandlers';
import { routerHandlersScript } from './routerHandlers';
import { mobileNavigationHandlersScript } from './mobileNavigationHandlers';

/**
 * Creates the complete script to inject into HTML content
 */
export const createInjectedScript = (): string => {
  return `
    <script>
    ${downloadPreventionScript}
    
    ${downloadHandlersScript}
    
    ${cookieHandlersScript}
    
    ${modalHandlersScript}
    
    ${routerHandlersScript}
    
    ${mobileNavigationHandlersScript}
    
    // Initialize all handlers
    (function() {
      // Add click handlers when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
          addDownloadClickHandlers();
          setupCookieConsent();
          setupImageModalBlocker();
          setupRouterHandlers();
          setupMobileNavigation();
        });
      } else {
        addDownloadClickHandlers();
        setupCookieConsent();
        setupImageModalBlocker();
        setupRouterHandlers();
        setupMobileNavigation();
      }
      
      // Re-add handlers periodically to catch dynamically added elements
      setInterval(function(){
        addDownloadClickHandlers();
        setupCookieConsent();
        setupImageModalBlocker();
        setupRouterHandlers();
        setupMobileNavigation();
      }, 5000); // Reduced frequency to 5 seconds
    })();
    </script>
  `;
};

/**
 * Creates a script tag with the injected content
 */
export const createScriptTag = (): string => {
  return createInjectedScript();
};
