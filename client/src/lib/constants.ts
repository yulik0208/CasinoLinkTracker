// API URL based on environment
export const API_URL = import.meta.env.PROD 
  ? window.location.origin // This will use the same domain in production
  : '';

// Use this for API requests
export const getApiUrl = (endpoint: string) => {
  return `${API_URL}/api${endpoint}`;
};