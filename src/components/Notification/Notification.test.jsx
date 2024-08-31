// src/components/NotificationBadge.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NotificationBadge from './NotificationBadge';

describe('NotificationBadge Component', () => {
  const notifications = ['Notification 1', 'Notification 2'];

  test('renders notification icon with badge', () => {
    render(<NotificationBadge notifications={notifications} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('opens menu when icon is clicked', () => {
    render(<NotificationBadge notifications={notifications} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  test('displays notifications in the menu', () => {
    render(<NotificationBadge notifications={notifications} />);
    fireEvent.click(screen.getByRole('button'));
    notifications.forEach((notification) => {
      expect(screen.getByText(notification)).toBeInTheDocument();
    });
  });

  test('displays "No hay notificaciones" when there are no notifications', () => {
    render(<NotificationBadge notifications={[]} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('No hay notificaciones')).toBeInTheDocument();
  });

  test('closes menu when a notification is clicked', () => {
    render(<NotificationBadge notifications={notifications} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText(notifications[0]));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
