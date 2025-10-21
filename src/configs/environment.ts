// Environment configuration
export const ENV_CONFIG = {
  // Authentication
  AUTH_REDIRECT_URL: import.meta.env.VITE_AUTH_REDIRECT_URL,
  // Demo mode - disables authentication
  DEMO_MODE: import.meta.env.VITE_DEMO_MODE === 'true',
} as const; 