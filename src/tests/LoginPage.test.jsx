import { MemoryRouter } from 'react-router-dom';
import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';

test('Login page renders without crashing', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/GAMS Login/i)).toBeInTheDocument();
});
