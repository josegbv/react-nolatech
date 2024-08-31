// src/components/Login.jsx
import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiar el error al intentar enviar el formulario

    if (!username || !password) {
      setError('Por favor, llena todos los campos');
      return;
    }

    const validUsers = [
      { username: 'admin', password: 'admin123' },
      { username: 'user', password: 'user123' }
    ];

    const user = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onLogin(username);
    } else {
      setError('Usuario o contraseña no válidos');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Box
          padding={4}
          borderRadius={2}
          boxShadow={3}
          bgcolor="background.paper"
          width="100%"
        >
          <Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center' }}>
            Login
          </Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={!!error && !username}
              helperText={error && !username ? 'El nombre de usuario es requerido' : ''}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!error && !password}
              helperText={error && !password ? 'La contraseña es requerida' : ''}
            />
            {error && (
              <Typography color="error" style={{ textAlign: 'center' }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
