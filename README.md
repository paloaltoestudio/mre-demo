# MRE Appointment Demo

A React + TypeScript + Vite application for managing appointments, visas, passports, and certifications.

## Quick Start for Demo

To run the application in **demo mode** (without authentication):

1. Create a `.env` file in the project root:
```env
VITE_DEMO_MODE=true
VITE_API_URL=https://your-api-url.com/api
VITE_AUTH_REDIRECT_URL=http://localhost:3000
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will automatically create a fake user session and bypass all authentication. See [DEMO_MODE.md](./DEMO_MODE.md) for detailed information.

## Environment Variables

Required environment variables:
- `VITE_DEMO_MODE` - Set to `true` to enable demo mode (bypasses authentication)
- `VITE_API_URL` - Base URL for the API
- `VITE_AUTH_REDIRECT_URL` - URL to redirect for authentication (not used in demo mode)
- `VITE_MAPS_API_KEY` - Google Maps API key (optional)

## Deployment

### Netlify

The project includes a `public/_redirects` file that handles SPA routing on Netlify. This ensures that all routes are properly handled by React Router, even when users navigate directly to inner pages or refresh the page.

**Build settings for Netlify:**
- Build command: `npm run build`
- Publish directory: `dist`

### Environment Variables on Netlify

Make sure to configure the following environment variables in your Netlify dashboard (Site settings > Environment variables):

- `VITE_DEMO_MODE` - Set to `true` for demo mode, `false` for production
- `VITE_API_URL` - Your API base URL
- `VITE_AUTH_REDIRECT_URL` - Authentication redirect URL
- `VITE_MAPS_API_KEY` - Google Maps API key (optional)

## Documentation

- [Demo Mode Guide](./DEMO_MODE.md) - How to run without authentication
- [User Store Guide](./docs/USER_STORE_GUIDE.md)
- [Traceability Logging](./docs/TRACEABILITY_LOGGING.md)
- [Appointment Detail Functionality](./docs/APPOINTMENT_DETAIL_FUNCTIONALITY.md)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
