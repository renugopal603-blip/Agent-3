import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const LandingPage = lazy(() => import('./pages/landing/LandingPage'));
const ContactPage = lazy(() => import('./pages/landing/ContactPage'));
const AboutPage = lazy(() => import('./pages/landing/AboutPage'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const AdminDashboard = lazy(() => import('./dashboards/admin/AdminDashboard'));
const AgentDashboard = lazy(() => import('./dashboards/agent/AgentDashboard'));
const SubAdminDashboard = lazy(() => import('./dashboards/subadmin/SubAdminDashboard'));
const AgentStatusPage = lazy(() => import('./pages/agent/AgentStatusPage'));
const ListingPage = lazy(() => import('./pages/landing/ListingPage'));

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
  console.log('App.jsx: Rendering App');
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Router>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
              <div className="w-12 h-12 border-4 border-primary-light border-t-transparent rounded-full animate-spin"></div>
            </div>}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/explore/:type/:category" element={<ListingPage />} />
                
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
            </Suspense>
          </Router>
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
