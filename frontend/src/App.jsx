import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/landing/LandingPage';
import ContactPage from './pages/landing/ContactPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AdminDashboard from './dashboards/admin/AdminDashboard';
import AgentDashboard from './dashboards/agent/AgentDashboard';
import SubAdminDashboard from './dashboards/subadmin/SubAdminDashboard';
import AgentStatusPage from './pages/agent/AgentStatusPage';

import { NotificationProvider } from './context/NotificationContext';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role) && !roles.some(r => user.role.includes(r))) {
    return <Navigate to="/" />;
  }

  // Gated access for Agents - REMOVED Gating to allow full dashboard access as requested
  // if (user.role === 'Agent' && user.applicationStatus !== 'Approved') {
  //   return <AgentStatusPage />;
  // }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Dashboard Routes */}
              <Route 
                path="/dashboard/admin" 
                element={
                  <ProtectedRoute roles={['Admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/agent" 
                element={
                  <ProtectedRoute roles={['Agent']}>
                    <AgentDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/subadmin" 
                element={
                  <ProtectedRoute roles={['Sub-Admin', 'SubAdmin']}>
                    <SubAdminDashboard />
                  </ProtectedRoute>
                } 
              />
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
