# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on http://localhost:3000 (auto-opens browser)
npm run build     # Type-check and build to dist/
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

There are no tests in this project.

## Environment Variables

Required in `.env`:
- `VITE_API_URL` — base URL for the backend API (e.g. `https://agendamiento-dev.devcancilleria.com.co/api/api`)
- `VITE_AUTH_REDIRECT_URL` — external auth portal URL users are redirected to when unauthenticated
- `VITE_RECAPTCHA_SITE_KEY` — Google reCAPTCHA site key
- `VITE_MAPS_API_KEY` — Google Maps API key
- `VITE_OTP_URL` — external OTP service endpoint

## Architecture

### Stack
React 19, TypeScript, Vite, Tailwind CSS v4 (via `@tailwindcss/vite` plugin). Path alias `@` maps to `/src`.

### Routing & Layouts
`MainRouter.tsx` defines all routes using React Router v6 `BrowserRouter`. Routes are grouped under layout components:
- `AuthLayout` — wraps most app routes; includes `ProtectedRoute`, `TokenExpirationChecker`, `TimerBanner`, `BookingTimerExpirationHandler`, and Google Maps `LoadScript`
- `PublicLayout` — auth callback route (`/auth/callback`)
- `AccessLayout` — identity verification (`/access/verification-id`)
- `AuthOfficialLayout` — official/staff login (`/auth/official`)

### Authentication Flow
Authentication is hash-based — the external identity provider redirects back with `?hash=<token>` in the URL. Two user types exist: **ciudadano** (citizen) and **funcionario** (official/staff).

`ProtectedRoute` intercepts every route render:
1. Detects `?hash=` in URL and calls `POST /Token/decrypt` to exchange it for user data
2. If `data.isPayload` → citizen: makes a second call `POST /User/external` with `externalId`
3. If `data.jsonData` → official: constructs the user object directly from `jsonData.Data`
4. If no active user and no hash → redirects to `ENV_CONFIG.AUTH_REDIRECT_URL`

`HashAuthContext` (`src/contexts/HashAuthContext.tsx`) duplicates this logic at the context level and provides `isProcessing`, `isAuthenticated`, `hasHash`, and `processHash` to consumers.

`globalToken` (set from `data.token_api.access_token`) is stored in `SessionStore` and passed as `Authorization: Bearer` on subsequent API calls.

### Data Fetching
All HTTP calls go through `src/services/fetchingService.ts` using `axiosInstance` (base URL = `VITE_API_URL`):
- `getPublicRequest` — GET with Valibot schema validation on the response
- `postPublicRequest` — POST; validates body before sending; `ext: true` bypasses `axiosInstance` and uses plain `axios` (for external URLs); `auth` string adds Bearer header
- `putPublicRequest`, `deletePublicRequest` — PUT/DELETE wrappers

`usePublicQuery` wraps TanStack Query's `useQuery` with these defaults: `refetchOnWindowFocus: false`, `staleTime: 0`, `gcTime: 0`, `retry: 3`.

Mutations use `useMutation` directly from TanStack Query, calling the fetching service functions.

### Schema Validation
Every API request/response uses **Valibot** schemas (in `src/schemas/`). Schemas are colocated with their type definitions in `src/types/`. Types are derived from schemas via `InferInput`/`InferOutput`.

### State Management (Zustand)
Stores are in `src/stores/`. Two stores use `persist` middleware (localStorage):
- **`SessionStore`** — auth state: `isAuthenticated`, `activeUser`, `globalToken`, `tokenExpiration`, `userId`, `externalId`, `userType`, `official` flag, `otp`
- **`SchedulingsStore`** — scheduling wizard in-progress state: pending appointments, rescheduling data, selected country/consulate/date/time

Non-persisted stores: `useAppointmentWizardStore` (current wizard step), `bookingTimerStore`, `certificationStore`, `visaStore`, `routesStore`.

### Forms
All forms use **react-hook-form** with `useFormContext` for nested form components. `Controller` wraps third-party inputs (react-select, date pickers). Validation rules are defined inline in `Controller` or via Valibot schemas.

### Feature Modules
Multi-step wizard pattern is used throughout. Each domain has a `*Wizard` orchestrator component that controls step state, and individual step components receive `setView` / step props:
- **Scheduling** (`src/components/scheduling/`) — appointment booking wizard; steps: select consulate → select appointment type & procedure → select date → dependent info → summary
- **Passport** (`src/components/passport/`) — passport application wizard
- **Visa** (`src/components/visa/`) — visa application wizard  
- **Certifications** (`src/components/certifications/`) — certification request wizard

### Timers
`BookingTimerExpirationHandler` and `TimerBanner` (rendered inside `AuthLayout`) manage a booking hold timer via `bookingTimerStore`. When a time slot is selected, the timer starts; expiration releases the pre-appointment via `useReleasePreAppointment`.

`TokenExpirationChecker` polls `SessionStore.tokenExpiration` and redirects to the external auth URL when the session token expires.

### Traceability
`useTraceabilityLog` (`src/hooks/useTraceabilityLog.ts`) logs user actions to the backend for audit purposes. Called at key workflow transitions throughout the scheduling and wizard flows.
