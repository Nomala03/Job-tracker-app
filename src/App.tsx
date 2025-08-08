import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Router>
        <div className="min-h-screen bg-gray-100 text-gray-900">
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>  
      </Router> 
  )
}

export default App
