import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// @ts-ignore
import App from './App.jsx'
// @ts-ignore
import { AuthProvider } from "./context/AuthContext.jsx";
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
      <Toaster position='top-center'/>
    </AuthProvider>
  </StrictMode>,
)
