import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import ReportAccident from './components/ReportAccident'
import EmergencyServices from './components/EmergencyServices'
import AccidentHistory from './components/AccidentHistory'
import Settings from './components/Settings'
import LoginRegister from './components/LoginRegister'
import { AuthProvider, useAuth } from './AuthContext'
import './App.css'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginRegister />} />
      <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
      <Route path="/report" element={<PrivateRoute><ReportAccident /></PrivateRoute>} />
      <Route path="/emergency" element={<PrivateRoute><EmergencyServices /></PrivateRoute>} />
      <Route path="/history" element={<PrivateRoute><AccidentHistory /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50" dir="rtl">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


