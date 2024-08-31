import React from 'react';
import { Navigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth'; 

const ProtectedRoute = ({ component: Component, requiredRole }) => {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return <Component />;
};

export default ProtectedRoute;
