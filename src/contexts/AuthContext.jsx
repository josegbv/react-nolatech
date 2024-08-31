import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

  const login = (username) => {
    setIsAuthenticated(true);
    setUserRole(username === 'admin' ? 'admin' : 'user');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
