import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import JobDetailsPage from './pages/JobDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/jobs/:id" element={<JobDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>  
      </Router> 
  )
}

export default App
