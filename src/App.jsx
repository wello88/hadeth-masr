import { useState } from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ReportAccident from './components/ReportAccident'
import EmergencyServices from './components/EmergencyServices'
import AccidentHistory from './components/AccidentHistory'
import Settings from './components/Settings'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/report" element={<ReportAccident />} />
          <Route path="/emergency" element={<EmergencyServices />} />
          <Route path="/history" element={<AccidentHistory />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App


