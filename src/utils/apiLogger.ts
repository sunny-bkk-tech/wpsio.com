// This function sends a POST request to our self-hosted logging server.

const LOGGING_SERVER_URL = '/api/log'; // Use a relative path

// Key for storing the date of the last log in localStorage
const LAST_LOG_DATE_KEY = 'wpsio_last_log_date';

// Helper function to get the current date in YYYY-MM-DD format
function getCurrentDateString(): string {
  return new Date().toISOString().split('T')[0];
}

// Helper function to get a simple fingerprint
function generateFingerprint(): string {
  const parts = [
    navigator.language,
    navigator.platform,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset().toString(),
  ];
  return btoa(parts.join('|')).substring(0, 16);
}

export const logVisitToServer = async () => {
  try {
    const today = getCurrentDateString();
    const lastLogDate = localStorage.getItem(LAST_LOG_DATE_KEY);

    // Only log if the user hasn't been logged today
    if (lastLogDate === today) {
      return; // A visit has already been logged today.
    }

    const visitData = {
      event: 'page_view',
      path: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      fingerprint: generateFingerprint(),
      // Add any other client-side context you want to log
    };

    await fetch(LOGGING_SERVER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitData),
      // We use 'keepalive' to ensure the request is sent even if the user navigates away
      keepalive: true,
    });

    // If the log was sent successfully, update the date in localStorage
    localStorage.setItem(LAST_LOG_DATE_KEY, today);
  } catch (error) {
    // We log errors to the console but don't bother the user with them.
    console.error('Failed to log visit:', error);
  }
};
