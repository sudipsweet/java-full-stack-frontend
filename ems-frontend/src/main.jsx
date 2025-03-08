import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
/* Import all of Bootstrap's CSS */
import "bootstrap/dist/css/bootstrap.min.css"
/* Import all of Bootstrap's JS */
import "bootstrap/dist/js/bootstrap.bundle.min"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
