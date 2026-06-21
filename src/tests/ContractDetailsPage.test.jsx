import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import ContractDetailsPage from '../pages/ContractDetailsPage';
import api from '../services/api';

vi.mock('../services/api');

test('shows loading state initially', () => {
  api.get.mockReturnValue(new Promise(() => {}));

  render(
    <MemoryRouter initialEntries={['/contracts/1']}>
      <Routes>
        <Route path="/contracts/:id" element={<ContractDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('shows error message when api call fails', async () => {
  api.get.mockRejectedValue(new Error('Network error'));

  render(
    <MemoryRouter initialEntries={['/contracts/1']}>
      <Routes>
        <Route path="/contracts/:id" element={<ContractDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to load contract.')).toBeInTheDocument();
  });
});
