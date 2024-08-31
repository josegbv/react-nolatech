import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useAuth from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import EvaluationForm from './components/EvaluationForm/EvaluationForm';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Administration from './components/Administration/Administration';
import { AuthProvider } from './contexts/AuthContext';

const theme = createTheme();

// Lazy load components
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const EvaluationResults = lazy(() => import('./components/EvaluationResult/EvaluationResults'));
const EmployeeProfile = lazy(() => import('./components/EmployeeProfile/EmployeeProfile'));

function App() {
  const { isAuthenticated, userRole, login, logout } = useAuth();

  return (
    <ThemeProvider theme={theme}>
      <Router>
        {isAuthenticated && <Navbar onLogout={logout} />}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login onLogin={login} /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
            <Route path="/employee-profile" element={<ProtectedRoute component={EmployeeProfile} />} />
            <Route path="/evaluation-form" element={<ProtectedRoute component={EvaluationForm} />} />
            <Route path="/evaluation-results" element={<ProtectedRoute component={EvaluationResults} />} />
            {userRole === 'admin' && (
              <Route path="/administration" element={<ProtectedRoute component={Administration} requiredRole="admin" />} />
            )}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
