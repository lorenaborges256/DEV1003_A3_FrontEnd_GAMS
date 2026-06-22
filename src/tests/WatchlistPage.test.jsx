import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import WatchlistPage from '../pages/WatchlistPage';
import api from '../services/api';

vi.mock('../services/api');

test('shows loading state initially', () => {
  api.get.mockReturnValue(new Promise(() => {}));

  render(
    <MemoryRouter>
      <WatchlistPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('shows error message when api call fails', async () => {
  api.get.mockRejectedValue(new Error('Network error'));

  render(
    <MemoryRouter>
      <WatchlistPage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to load watchlist.')).toBeInTheDocument();
  });
});
