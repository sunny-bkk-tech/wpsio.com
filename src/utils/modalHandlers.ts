/**
 * Image modal handlers for HTMLViewer
 * Handles closing of image-based modals and popups
 */

export const modalHandlersScript = `
// Image modal blocker: hide modal that contains a specific PNG and remember
function setupImageModalBlocker() {
  try {
    const targetSubstring = 'bd1e87f0940d6f32993e5b5c981f287b.png';
    const dismissed = localStorage.getItem('imageModalDismissed');

    // Find any image matching the target
    const imgs = Array.from(document.querySelectorAll('img'));
    const targetImgs = imgs.filter(function(img){
      return img && typeof img.src === 'string' && img.src.indexOf(targetSubstring) !== -1;
    });

    if (targetImgs.length === 0) return;

    targetImgs.forEach(function(img){
      // More comprehensive modal container detection
      var container = img.closest('.modal, .modal-container, .dialog, .popup, .pop, .layer, .overlay, .popup-container, .modal-wrapper, .dialog-wrapper, [class*="modal"], [class*="popup"], [class*="dialog"]');
      
      if (!container) {
        // Walk up the DOM tree more thoroughly
        var p = img.parentElement;
        var hops = 0;
        while (p && hops < 8) {
          // Check for common modal/popup patterns
          if (/(modal|dialog|popup|overlay|layer|wrapper|container)/i.test(p.className) || 
              p.style.position === 'fixed' || 
              p.style.zIndex > 1000 ||
              p.getAttribute('role') === 'dialog') {
            container = p;
            break;
          }
          p = p.parentElement;
          hops++;
        }
      }
      
      if (!container) {
        console.log('Could not find modal container for image:', img.src);
        return;
      }

      // If previously dismissed, hide immediately
      if (dismissed === 'true') {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        var overlay = container.closest('.overlay, .backdrop, [class*="overlay"], [class*="backdrop"]');
        if (overlay) {
          overlay.style.display = 'none';
          overlay.style.visibility = 'hidden';
        }
        return;
      }

      function hideModal() {
        container.style.display = 'none';
        container.style.visibility = 'hidden';
        container.style.opacity = '0';
        var overlay = container.closest('.overlay, .backdrop, [class*="overlay"], [class*="backdrop"]');
        if (overlay) {
          overlay.style.display = 'none';
          overlay.style.visibility = 'hidden';
        }
        localStorage.setItem('imageModalDismissed', 'true');
        console.log('Image modal dismissed');
      }

      // More comprehensive close button detection
      var closeSelectors = [
        '.close', '.btn-close', '.icon-close', '.modal-close', '.popup-close',
        '[aria-label="Close"]', '[aria-label="close"]', '[aria-label="關閉"]',
        'button[title="Close"]', 'button[title="close"]', 'button[title="關閉"]',
        '.close-btn', '.close-button', '.x', '.times', '.fa-times', '.fa-close',
        '[data-dismiss="modal"]', '[data-close="modal"]', '[data-close="popup"]',
        'button[class*="close"]', 'span[class*="close"]', 'div[class*="close"]',
        'i[class*="close"]', 'a[class*="close"]'
      ];
      
      var closeBtns = [];
      closeSelectors.forEach(function(selector) {
        var found = container.querySelectorAll(selector);
        closeBtns = closeBtns.concat(Array.from(found));
      });

      // Also look for X symbols or close icons in the container
      var allElements = container.querySelectorAll('*');
      allElements.forEach(function(el) {
        if (el.textContent && (el.textContent.trim() === '×' || el.textContent.trim() === '✕' || el.textContent.trim() === '✖' || el.textContent.trim() === 'X')) {
          closeBtns.push(el);
        }
      });

      closeBtns.forEach(function(btn){
        if (!btn.__imgModalHooked) {
          btn.addEventListener('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            hideModal();
            return false;
          }, true);
          btn.__imgModalHooked = true;
          console.log('Wired close button:', btn);
        }
      });

      // Allow clicking on backdrop to close
      var globalOverlay = container.closest('.overlay, .backdrop, [class*="overlay"], [class*="backdrop"]');
      if (globalOverlay && !globalOverlay.__imgModalHooked) {
        globalOverlay.addEventListener('click', function(e){
          // Only close if the click is on the overlay, not inside the modal
          if (e.target === globalOverlay) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
            return false;
          }
        }, true);
        globalOverlay.__imgModalHooked = true;
      }

      // Add click handler to the container itself for any click
      if (!container.__imgModalHooked) {
        container.addEventListener('click', function(e){
          // Check if click is on close-related elements
          if (e.target && (
            e.target.classList.contains('close') ||
            e.target.classList.contains('btn-close') ||
            e.target.classList.contains('icon-close') ||
            e.target.textContent && e.target.textContent.trim() === '×' ||
            e.target.textContent && e.target.textContent.trim() === '✕' ||
            e.target.textContent && e.target.textContent.trim() === '✖' ||
            e.target.textContent && e.target.textContent.trim() === 'X'
          )) {
            e.preventDefault();
            e.stopPropagation();
            hideModal();
            return false;
          }
        }, true);
        
        container.addEventListener('keydown', function(e){
          if (e.key === 'Escape') {
            hideModal();
          }
        }, true);
        container.__imgModalHooked = true;
      }

      console.log('Image modal container found:', container);
      console.log('Close buttons found:', closeBtns.length);
    });
  } catch (err) {
    console.log('Image modal blocker error:', err);
  }
}
`;
