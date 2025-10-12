import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './contexts/authContext.jsx';
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <App/>
    </AuthProvider>
)
