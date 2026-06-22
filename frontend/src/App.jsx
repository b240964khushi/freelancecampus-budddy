import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SupplyForm from './components/SupplyForm'
import AvailableItems from './components/AvailableItems'
import DemandForm from './components/DemandForm'
import ViewDemands from './components/ViewDemands'
import Login from './pages/Login'
import Register from './pages/Register'

function ProtectedApp() {
  const [currentPage, setCurrentPage] = useState('supply')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'supply' && <SupplyForm setCurrentPage={setCurrentPage} />}
        {currentPage === 'available' && <AvailableItems />}
        {currentPage === 'demand' && <DemandForm setCurrentPage={setCurrentPage} />}
        {currentPage === 'view-demands' && <ViewDemands />}
      </main>
    </div>
  )
}

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      }
    }
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    )
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={
          user ? <Navigate to="/" replace /> : <Login setUser={setUser} />
        }
      />
      <Route
        path="/register"
        element={
          user ? <Navigate to="/" replace /> : <Register setUser={setUser} />
        }
      />
      <Route
        path="/*"
        element={
          user ? <ProtectedApp /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  )
}
