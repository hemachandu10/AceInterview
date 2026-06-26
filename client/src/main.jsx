import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router"
import Home from './landingPages/home'
import Signup from './landingPages/signup'
import Login from './landingPages/login'
import ProtectedRoute from './landingPages/protectedRoute'
import Dashboard from './landingPages/dashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
