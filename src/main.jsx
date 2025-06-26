import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Login from './pages/Login/Login'
import DashboardPage from './pages/Dashboard/DashboardPage'
import MealsPage from './pages/Meals/MealsPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/meals" element={<MealsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
