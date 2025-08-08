import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
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
          </Routes>
        </div>  
      </Router> 
  )
}

export default App
