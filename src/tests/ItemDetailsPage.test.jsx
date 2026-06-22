import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import ItemDetailsPage from '../pages/ItemDetailsPage';
import api from '../services/api';

vi.mock('../services/api');

test('shows loading state initially', () => {
  api.get.mockReturnValue(new Promise(() => {}));

  render(
    <MemoryRouter initialEntries={['/items/1']}>
      <Routes>
        <Route path="/items/:id" element={<ItemDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('shows error message when api call fails', async () => {
  api.get.mockRejectedValue(new Error('Network error'));

  render(
    <MemoryRouter initialEntries={['/items/1']}>
      <Routes>
        <Route path="/items/:id" element={<ItemDetailsPage />} />
      </Routes>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText('Failed to load item.')).toBeInTheDocument();
  });
});
