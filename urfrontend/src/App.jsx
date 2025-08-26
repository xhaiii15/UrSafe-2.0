import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import PrivateRoute from './pages/PrivateRoute'
import Home from './pages/Home'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>} />
        <Route path="/login" element={<Login />} />

        <Route 
          path="/home" 
          element={<PrivateRoute> 
                      <Home/> 
                  </PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
