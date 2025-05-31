import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.css'
import App from "./App.tsx";
import {Toaster} from "react-hot-toast";
import AuthProvider from "./lib/auth-context.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
          <BrowserRouter>
              <App />
              <Toaster />
          </BrowserRouter>
      </AuthProvider>
  </StrictMode>,
)
