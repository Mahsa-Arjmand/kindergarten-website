import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { hideBootLoader } from './components/SiteLoader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Remove the static splash painted by index.html once React has mounted.
// (Runs after the first paint so there is no flash of empty content.)
requestAnimationFrame(() => hideBootLoader());
