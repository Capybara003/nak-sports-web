export const API_CONFIG = {
  // Development environment
  DEV: 'https://api-mobile.dev.nak-sports.diversius.com/v1/',
  // Test environment
  TEST: 'https://api-mobile.test.nak-sports.diversius.com/v1/',
  // Production environment
  PROD: 'https://mobile-api.manager.nak-sports.com/v1/',
  // Demo environment
  DEMO: 'https://mobile-api.manager-demo.nak-sports.com/v1/',
};

// Default to development environment
export const API_BASE_URL = API_CONFIG.DEMO;

export const API_HEADERS = {
  'Content-Type': 'application/json',
  'Accept-Language': 'en',
};

export const ANONYMOUS_HEADER = 'ANONYMOUS';
export const ACCEPT_LANGUAGE_HEADER = 'Accept-Language';

// Get auth token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get refresh token from localStorage
export const getRefreshToken = (): string | null => {
  return localStorage.getItem('refreshToken');
};

// Get user hash from localStorage
export const getUserHash = (): string | null => {
  return localStorage.getItem('userHash');
};

// Get current locale from localStorage or default to 'en'
export const getCurrentLocale = (): string => {
  return localStorage.getItem('locale') || 'en';
};

// Build headers for API requests
export const buildHeaders = (isAnonymous: boolean = false): Record<string, string> => {
  const headers: Record<string, string> = {
    ...API_HEADERS,
    [ACCEPT_LANGUAGE_HEADER]: getCurrentLocale(),
  };

  if (!isAnonymous) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  } else {
    headers[ANONYMOUS_HEADER] = 'true';
  }

  return headers;
}; 