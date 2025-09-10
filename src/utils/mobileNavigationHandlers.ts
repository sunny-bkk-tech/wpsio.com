/**
 * Mobile navigation handlers for static HTML content
 * Provides mobile menu functionality for the iframe content
 */

export const mobileNavigationHandlersScript = `
/**
 * Mobile navigation functionality
 */
function setupMobileNavigation() {
  // Mobile menu state
  let isMobileMenuOpen = false;
  
  // Toggle mobile menu function
  window.toggleMobileMenu = function() {
    isMobileMenuOpen = !isMobileMenuOpen;
    
    const mobileMenuContainer = document.querySelector('.mobile-menu-container');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileMenuContainer && mainMenu) {
      if (isMobileMenuOpen) {
        // Open menu
        mobileMenuContainer.classList.add('shadow');
        mainMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
      } else {
        // Close menu
        mobileMenuContainer.classList.remove('shadow');
        mainMenu.classList.remove('show');
        document.body.style.overflow = 'unset';
      }
    }
  };
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (isMobileMenuOpen) {
      const mobileMenuContainer = document.querySelector('.mobile-menu-container');
      const mainMenu = document.querySelector('.main-menu');
      
      if (mobileMenuContainer && mainMenu && 
          !mobileMenuContainer.contains(e.target) && 
          !mainMenu.contains(e.target)) {
        window.toggleMobileMenu();
      }
    }
  });
  
  // Close mobile menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMobileMenuOpen) {
      window.toggleMobileMenu();
    }
  });
  
  // Close mobile menu when clicking on menu items
  const menuItems = document.querySelectorAll('.main-menu .menu-name');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      if (isMobileMenuOpen) {
        window.toggleMobileMenu();
      }
    });
  });
  
  // Also handle clicks on the entire menu items
  const menuDivs = document.querySelectorAll('.main-menu .menu');
  menuDivs.forEach(menuDiv => {
    menuDiv.addEventListener('click', function() {
      if (isMobileMenuOpen) {
        window.toggleMobileMenu();
      }
    });
  });
  
  // Add direct event listener for the menu icon
  const menuIcon = document.querySelector('.menu-icon');
  if (menuIcon) {
    menuIcon.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      window.toggleMobileMenu();
    });
  }
}

// Initialize mobile navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMobileNavigation);
} else {
  setupMobileNavigation();
}
`;
