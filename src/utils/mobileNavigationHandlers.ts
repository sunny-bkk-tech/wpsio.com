/**
 * Mobile navigation handlers for static HTML content
 * Provides mobile menu functionality for the iframe content
 */

export const mobileNavigationHandlersScript = `
// Prevent multiple initializations
if (!window.mobileNavInitialized) {
  window.mobileNavInitialized = true;

/**
 * Mobile navigation functionality
 */
function setupMobileNavigation() {
  if (window.mobileNavSetup) return;
  window.mobileNavSetup = true;

  let isMobileMenuOpen = false;

  // Toggle mobile menu function
  window.toggleMobileMenu = function(forceState = null) {
    isMobileMenuOpen = forceState !== null ? forceState : !isMobileMenuOpen;

    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mainMenu = document.querySelector('.main-menu');
    if (!mobileMenuContainer || !mainMenu) return;

    if (isMobileMenuOpen) {
      mobileMenuContainer.classList.add('shadow');
      mainMenu.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenuContainer.classList.remove('shadow');
      mainMenu.classList.remove('show');
      document.body.style.overflow = '';
    }
  };

  // Close on overlay click
  document.addEventListener('click', function(e) {
    if (!isMobileMenuOpen) return;
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    if (mobileMenuContainer && e.target === mobileMenuContainer) {
      window.toggleMobileMenu(false);
    }
  });

  // Close on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      window.toggleMobileMenu(false);
    }
  });

  // Delegate menu item clicks
  const mainMenu = document.querySelector('.main-menu');
  if (mainMenu) {
    mainMenu.addEventListener('click', function(e) {
      if (e.target.closest('.menu, .menu-name')) {
        if (isMobileMenuOpen) window.toggleMobileMenu(false);
      }
    });
  }

  // Attach hamburger menu handler
  function attachMenuIconHandler(icon) {
    if (!icon || icon._mobileHandlerAttached) return;
    icon._mobileHandlerAttached = true;

    const handler = function(e) {
      if (e.cancelable) e.preventDefault();
      e.stopPropagation();
      window.toggleMobileMenu();
    };

    icon.addEventListener('click', handler);
    icon.addEventListener('touchstart', handler);
  }

  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    attachMenuIconHandler(menuIcon);
  } else {
    // Watch DOM for menu icon later
    const observer = new MutationObserver(() => {
      const icon = document.querySelector('.menu-icon');
      if (icon) {
        attachMenuIconHandler(icon);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// Initialize mobile navigation
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMobileNavigation);
} else {
  setupMobileNavigation();
}

} // end initialization guard
`;
