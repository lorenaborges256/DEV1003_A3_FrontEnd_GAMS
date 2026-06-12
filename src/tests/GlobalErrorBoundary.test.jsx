import { render, screen } from '@testing-library/react';
import GlobalErrorBoundary from '../components/GlobalErrorBoundary';

function ProblemChild() {
  throw new Error('Boom');
}

test('GlobalErrorBoundary renders fallback UI', () => {
  render(
    <GlobalErrorBoundary>
      <ProblemChild />
    </GlobalErrorBoundary>
  );

  expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
});
