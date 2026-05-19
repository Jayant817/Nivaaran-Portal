import { Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Dashboard from '../pages/Dashboard'
import AddComplaint from '../pages/AddComplaint'
import ComplaintList from '../pages/ComplaintList'
import UpdateStatus from '../pages/UpdateStatus'
import AIAnalysis from '../pages/AIAnalysis'

import ProtectedRoute
from '../components/ProtectedRoute'

function AppRoutes() {

  return (
    <>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-complaint"
          element={
            <ProtectedRoute>
              <AddComplaint />
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <ProtectedRoute>
              <ComplaintList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/update-status"
          element={
            <ProtectedRoute>
              <UpdateStatus />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-analysis"
          element={
            <ProtectedRoute>
              <AIAnalysis />
            </ProtectedRoute>
          }
        />

      </Routes>

    </>
  )
}

export default AppRoutes