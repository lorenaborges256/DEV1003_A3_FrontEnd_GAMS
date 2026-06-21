import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import ContractsPage from '../pages/ContractsPage';
import api from '../services/api';

vi.mock('../services/api');

test('shows loading state initially', () => {
  api.get.mockReturnValue(new Promise(() => {}));

  render(
    <MemoryRouter>
      <ContractsPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('shows error message when api call fails', async () => {
  api.get.mockRejectedValue(new Error('Network error'));

  render(
    <MemoryRouter>
      <ContractsPage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to load contracts.')).toBeInTheDocument();
  });
});
