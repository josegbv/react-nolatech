
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import EmployeeProfile from './components/EmployeeProfile/EmployeeProfile';
import EvaluationForm from './components/EvaluationForm/EvaluationForm';
import EvaluationResults from './components/EvaluationResult/EvaluationResults';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState } from 'react';
import Administration from './components/Administration/Administration';

const theme = createTheme();


function App() {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAdmin = true;

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };



  return (
    <ThemeProvider theme={theme}>
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <Routes>
        {!isAuthenticated ? (
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employee-profile" element={<EmployeeProfile />} />
            <Route path="/evaluation-form" element={<EvaluationForm />} />
            <Route path="/evaluation-results" element={<EvaluationResults />} />
            <Route
              path="/Administration"
              element={isAdmin ? <Administration /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  </ThemeProvider>
)

}

export default App
