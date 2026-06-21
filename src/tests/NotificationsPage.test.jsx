import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import NotificationsPage from '../pages/NotificationsPage';
import api from '../services/api';

vi.mock('../services/api');

test('shows loading state initially', () => {
  api.get.mockReturnValue(new Promise(() => {}));

  render(
    <MemoryRouter>
      <NotificationsPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('shows error message when api call fails', async () => {
  api.get.mockRejectedValue(new Error('Network error'));

  render(
    <MemoryRouter>
      <NotificationsPage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to load notifications.')).toBeInTheDocument();
  });
});

test('shows empty state when there are no notifications', async () => {
  api.get.mockResolvedValue({ data: [] });

  render(
    <MemoryRouter>
      <NotificationsPage />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('You have no notifications.')).toBeInTheDocument();
  });
});
