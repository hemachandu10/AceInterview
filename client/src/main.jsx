import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from "react-router"
import Home from './landingPages/home'
import Signup from './landingPages/signup'
import Login from './landingPages/login'
import ProtectedRoute from './landingPages/protectedRoute'
import Dashboard from './landingPages/dashboard'
import InterviewFeedback from './landingPages/interviewFeedback'
import Navbar from './landingPages/navbar'
import InterviewStart from './landingPages/interviewStart'
import Footer from './landingPages/footer'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/dashboard' element={<ProtectedRoute>
          <Dashboard/>
        </ProtectedRoute>}/>
        <Route path='/interviewFeedback' element={<ProtectedRoute>
          <InterviewFeedback/>
        </ProtectedRoute>}/>
        <Route path='/interviewStart' element={<ProtectedRoute>
          <InterviewStart/>
        </ProtectedRoute>}/>
      </Routes>
      <Footer/>    
    </BrowserRouter>
  </StrictMode>,
)
