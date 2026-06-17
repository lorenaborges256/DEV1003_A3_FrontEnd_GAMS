import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

test('Login page renders without crashing', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  expect(screen.getByRole('heading', { name: /Welcome Back/i })).toBeInTheDocument();
});

test('renders email and password input fields', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
});

test('renders a login submit button', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

test('shows validation errors when form is submitted empty', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  fireEvent.submit(screen.getByRole('button', { name: /Login/i }).closest('form'));
  expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
  expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
});

test('renders a link to the registration page', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  expect(screen.getByRole('link', { name: /Create Account/i })).toBeInTheDocument();
});