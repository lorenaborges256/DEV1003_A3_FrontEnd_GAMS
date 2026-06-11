import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';

test('Layout renders Sidebar and Header correctly', () => {
  render(
    <MemoryRouter>
      <Layout title="Dashboard">
        <div>Test content</div>
      </Layout>
    </MemoryRouter>
  );

  // 1. Header + Sidebar both contain "GAMS"
  const titles = screen.getAllByText(/GAMS/i);
  expect(titles).toHaveLength(2);

  // 2. Sidebar links
  expect(screen.getAllByText(/Dashboard/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Items/i).length).toBeGreaterThan(0);
});
