/**
 * Download handlers for HTMLViewer iframe content
 * Provides manual download functionality and prevents unwanted downloads
 */

export const downloadHandlersScript = `
/**
 * Downloads the test.txt file with iframe-safe handling
 */
function downloadTestFile() {
  fetch('/test.txt')
    .then(response => response.ok ? response.text() : Promise.reject('Fetch failed'))
    .then(fileContent => {
      // Use iframe-safe method if running in iframe
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'DOWNLOAD_FILE',
          content: fileContent,
          filename: 'test.txt'
        }, '*');
        return;
      }

      // Direct download for non-iframe contexts
      const blob = new Blob([fileContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'test.txt';
      link.style.display = 'none';

      document.body.appendChild(link);
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, 100);
    })
    .catch(() => {
      // Fallback: direct download
      const link = document.createElement('a');
      link.href = '/test.txt';
      link.download = 'test.txt';
      link.style.display = 'none';
      document.body.appendChild(link);
      setTimeout(() => {
        link.click();
        document.body.removeChild(link);
      }, 100);
    });
}

/**
 * Sets up click handlers for download buttons
 */
function addDownloadClickHandlers() {
  if (document.__downloadDelegationAdded) return;

  document.addEventListener('click', function(e) {
    const target = e.target;
    if (!target) return;

    // Skip if this is a React component (mobile navigation, etc.)
    if (target.closest('.mobile-menu-toggle') || 
        target.closest('.mobile-menu') ||
        target.closest('.hamburger') ||
        target.closest('[data-react-component]')) {
      return; // Let React handle these clicks
    }

    // Check for manual download button
    const isManualDownload = target.classList.contains('linux-download-container') ||
                            target.closest('.linux-download-container');

    // Check for other download buttons (prevent their default behavior)
    const isDownloadButton = isManualDownload ||
      target.classList.contains('download-btn') ||
      target.classList.contains('download-btn-wrapper') ||
      target.closest('.download-btn') ||
      target.closest('.download-btn-wrapper') ||
      (target.closest('.download-item-ele, .download-tab-list, .download-item-list, .buttom-btn, .btn-list') &&
       target.textContent?.includes('下載') &&
       (target.tagName === 'BUTTON' || target.tagName === 'A'));

    if (isDownloadButton) {
      if (isManualDownload) {
        downloadTestFile();
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  document.__downloadDelegationAdded = true;
}
`;

/**
 * Prevents unwanted downloads and blocks malicious download attempts
 */
export const downloadPreventionScript = `
// Utility function to check if URL contains download patterns
function isDownloadUrl(url) {
  return url && (
    url.includes('.exe') ||
    url.includes('wps_office_inst') ||
    url.includes('onlinesetup') ||
    url.includes('wdl1.pcfg.cache.wpscdn.com')
  );
}

// Utility function to block download events
function blockDownloadEvent(e) {
  const target = e.target;
  if (!target) return;

  // Skip if this is a React component (mobile navigation, etc.)
  if (target.closest('.mobile-menu-toggle') || 
      target.closest('.mobile-menu') ||
      target.closest('.hamburger') ||
      target.closest('[data-react-component]')) {
    return; // Let React handle these events
  }

  const url = target.href || target.src || target.action;
  if (isDownloadUrl(url)) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
}

// Immediate download prevention
(function() {
  // Override navigator download methods
  if (window.navigator?.msSaveBlob) {
    window.navigator.msSaveBlob = () => false;
  }
  if (window.navigator?.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob = () => false;
  }

  // Block window.open for download URLs
  const originalOpen = window.open;
  window.open = function(url, ...args) {
    return isDownloadUrl(url) ? null : originalOpen.apply(this, arguments);
  };
})();

// Comprehensive download blocking
(function() {
  // Block location changes
  const originalAssign = window.location.assign;
  const originalReplace = window.location.replace;

  window.location.assign = function(url) {
    if (isDownloadUrl(url)) return;
    return originalAssign.apply(this, arguments);
  };

  window.location.replace = function(url) {
    if (isDownloadUrl(url)) return;
    return originalReplace.apply(this, arguments);
  };

  // Block history API changes
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;

  history.pushState = function(state, title, url) {
    if (isDownloadUrl(url)) return;
    return originalPushState.apply(this, arguments);
  };

  history.replaceState = function(state, title, url) {
    if (isDownloadUrl(url)) return;
    return originalReplaceState.apply(this, arguments);
  };

  // Block various user interaction events
  const events = ['click', 'mousedown', 'mouseup', 'submit', 'load'];
  events.forEach(event => {
    document.addEventListener(event, blockDownloadEvent, true);
  });

  // Location proxy for href changes
  try {
    const locationProxy = new Proxy(window.location, {
      set(target, property, value) {
        if (property === 'href' && isDownloadUrl(value)) return true;
        target[property] = value;
        return true;
      }
    });

    Object.defineProperty(window, 'location', {
      value: locationProxy,
      writable: false,
      configurable: false
    });
  } catch (e) {
    // Proxy not supported, skip
  }
})();
`;
