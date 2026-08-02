import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { ClerkProvider } from '@clerk/react-router'
import './index.css'
import App from './App.jsx'

const CLERK_PUBLISHABLE_KEY=import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const BASE_URL=import.meta.env.VITE_BASE_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}
        signInFallbackRedirectUrl={`${BASE_URL}home`}
        signUpFallbackRedirectUrl={`${BASE_URL}home`}>
        <App />
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
