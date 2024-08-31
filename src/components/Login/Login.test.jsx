// src/components/Login.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';

describe('Login Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    render(<Login onLogin={mockOnLogin} />);
  });

  test('renders login form', () => {
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('shows error message when fields are empty', () => {
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/por favor, llena todos los campos/i)).toBeInTheDocument();
  });

  test('shows error message for invalid credentials', () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'invalidUser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'invalidPass' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(screen.getByText(/usuario o contraseña no válidos/i)).toBeInTheDocument();
  });

  test('calls onLogin with valid credentials', () => {
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'admin' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'admin123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    expect(mockOnLogin).toHaveBeenCalledWith('admin');
  });
});
