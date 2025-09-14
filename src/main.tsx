import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/style.css'
import LoginForm from './pages/Login'
// import App from './App'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <LoginForm />
  </StrictMode>,
)
