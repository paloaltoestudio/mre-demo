# Demo Mode Configuration

This guide explains how to enable demo mode to bypass authentication for demonstration purposes.

## Overview

Demo mode allows you to run the application without requiring real authentication. When enabled:
- Login validation is completely bypassed
- A mock user is automatically created with demo credentials
- No hash or external authentication is required
- Token expiration is set to 1 year in the future

## How to Enable Demo Mode

### Option 1: Environment Variable (Recommended)

Create a `.env` file in the project root with the following content:

```env
# Demo Mode - Authentication disabled
VITE_DEMO_MODE=true

# Authentication (not needed in demo mode)
VITE_AUTH_REDIRECT_URL=http://localhost:3000

# Google Maps API (optional)
VITE_MAPS_API_KEY=your_api_key_here
```

### Option 2: Manual Configuration

If you already have a `.env` file, simply add or update this line:

```env
VITE_DEMO_MODE=true
```

## Mock Session Details

When demo mode is enabled, a complete fake session is automatically created that matches the structure of a real authenticated session. This includes:

### Mock User
- **ID**: 7
- **Document Number**: 987654321
- **Name**: Demo Test User Account
- **Email**: demo@example.com
- **Phone**: 3001234567
- **WhatsApp**: 3001234567
- **Office ID**: 1
- **User Type**: ciudadano (citizen)

### Mock Session State
The complete session object includes:

```json
{
  "state": {
    "isAuthenticated": true,
    "userId": 7,
    "externalId": "88df4719-b2f2-4a5e-9947-70fe6e7651b0",
    "userType": "ciudadano",
    "official": false,
    "globalToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenExpiration": "2026-10-21T...",
    "activeUser": {
      "id": 7,
      "documentNumber": "987654321",
      "firstName": "Demo",
      "middleName": "Test",
      "lastName": "User",
      "secondLastName": "Account",
      "email": "demo@example.com",
      "phone": "3001234567",
      "whatsapp": "3001234567",
      "officeId": 1,
      "acceptsDataProcessing": true,
      "acceptsTermsAndConditions": true,
      "acceptanceDate": "2025-08-01T19:24:10.4959131"
    }
  }
}
```

### Fake JWT Token
A properly formatted JWT token is generated (though not cryptographically valid):
- **Type**: Bearer
- **Expiration**: 1 year from activation
- **Permissions**: api.write, api.read
- **Scopes**: api.traceability

This token is stored in the session and will be included in API requests via the Authorization header.

## How to Disable Demo Mode

To return to normal authentication mode:

1. Set `VITE_DEMO_MODE=false` in your `.env` file, or
2. Remove the `VITE_DEMO_MODE` line entirely from your `.env` file
3. Restart the development server

## Important Notes

⚠️ **Warning**: Demo mode should NEVER be enabled in production environments!

- Demo mode completely disables authentication
- No API calls are made to validate users
- All authentication flows are bypassed
- This is intended for demonstration and testing purposes only

## Verifying the Demo Session

You can verify the fake session is working by:

### 1. Browser Console
When demo mode is activated, you'll see console logs like:
```
🎭 DEMO MODE: Creating complete mock session
✅ DEMO MODE: Complete mock session created:
   - User ID: 7
   - External ID: 88df4719-b2f2-4a5e-9947-70fe6e7651b0
   - User Type: ciudadano
   - Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiO...
   - Token Expiration: 10/21/2026, 12:00:00 PM
```

### 2. Browser localStorage
The session is persisted in localStorage. Open DevTools > Application > Local Storage and look for the `sessionStore` key. You'll see the complete session object.

### 3. React DevTools
If you have React DevTools installed, you can inspect the Zustand store to see all session values in real-time.

## Technical Details

Demo mode is implemented in:
- `src/configs/environment.ts` - Configuration flag
- `src/components/ProtectedRoute.tsx` - Authentication bypass logic
- `src/stores/sessionStore.ts` - Session state management

When demo mode is active:
- Hash processing is skipped
- Token validation is skipped
- External authentication redirect is bypassed
- A complete mock user session is created automatically with all required fields
- The fake JWT token is included in all API requests (though your API may reject it)

