/**
 * Cookie consent handlers for HTMLViewer
 * Handles GDPR cookie banner interactions
 */

export const cookieHandlersScript = `
// Cookie consent: accept/close and remember
function setupCookieConsent() {
  try {
    const gdpr = document.getElementById('gdpr');
    if (!gdpr) return;

    const modalContainer = gdpr.querySelector('.modal-container');
    const allowAllBtn = gdpr.querySelector('button.btn.small.btn-bottom');
    const refuseSpan = gdpr.querySelector('.refuse');
    const manageBtn = document.getElementById('manageCookie');

    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'all' || consent === 'refused') {
      gdpr.style.display = 'none';
      if (modalContainer) modalContainer.style.display = 'none';
    }

    function acceptAll() {
      localStorage.setItem('cookieConsent', 'all');
      gdpr.style.display = 'none';
      if (modalContainer) modalContainer.style.display = 'none';
      console.log('Cookie consent: accepted all');
    }

    function refuseNonEssential() {
      localStorage.setItem('cookieConsent', 'refused');
      gdpr.style.display = 'none';
      if (modalContainer) modalContainer.style.display = 'none';
      console.log('Cookie consent: refused non-essential');
    }

    if (allowAllBtn && !allowAllBtn.__cookieHooked) {
      allowAllBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        acceptAll();
        return false;
      }, true);
      allowAllBtn.__cookieHooked = true;
    }

    if (refuseSpan && !refuseSpan.__cookieHooked) {
      refuseSpan.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        refuseNonEssential();
        return false;
      }, true);
      refuseSpan.__cookieHooked = true;
    }

    if (manageBtn && !manageBtn.__cookieHooked) {
      manageBtn.addEventListener('click', function(e) {
        // Toggle modal visibility (open settings)
        if (modalContainer) {
          const isHidden = modalContainer.style.display === 'none' || modalContainer.style.display === '';
          modalContainer.style.display = isHidden ? 'block' : 'none';
        }
      }, true);
      manageBtn.__cookieHooked = true;
    }
  } catch (err) {
    console.log('Cookie consent setup error:', err);
  }
}
`;
