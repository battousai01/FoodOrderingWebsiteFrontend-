/*import { StrictMode } from 'react'*/
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Foodcontext from './context/Foodcontext'

createRoot(document.getElementById('root')).render(
  
  <BrowserRouter>
    <Foodcontext>
        <App />
    </Foodcontext>
  </BrowserRouter>
)
