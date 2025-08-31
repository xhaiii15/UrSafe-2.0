import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/dash" 
          element={<PrivateRoute> 
                      <Dashboard/> 
                  </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
