import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import RouterConfig from './config/router.config'
import { AuthProvider } from './context/auth.context'
// import LoginForm from './pages/Login'
// import App from './App'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterConfig />
    </AuthProvider>
  </StrictMode>,
)
