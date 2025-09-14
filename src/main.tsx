import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import RouterConfig from './config/router.config'
// import LoginForm from './pages/Login'
// import App from './App'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <LoginForm /> */}
    <RouterConfig />
  </StrictMode>,
)
