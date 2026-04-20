import { render, screen } from '@testing-library/react';

import Review from './review';

describe('Component: Review', () => {
  it('should render correctly', () => {
    render(
      <Review
        review={{
          id: 1,
          text: 'Great movie',
          author: 'John Doe',
          date: '2026-01-01T00:00:00.000Z',
          rating: 8,
        }}
      />
    );

    expect(screen.getByText(/Great movie/i)).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/8/i)).toBeInTheDocument();
  });
});
