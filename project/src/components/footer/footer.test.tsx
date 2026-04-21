import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import HistoryRouter from '../history-route/history-route';
import Footer from './footer';

const testHistory = createMemoryHistory();

const testComponent = (
  <HistoryRouter history={testHistory}>
    <Footer />
  </HistoryRouter>
);

describe('Component: Footer', () => {
  it('should render correctly', () => {
    render(testComponent);

    expect(screen.getByText(/What to watch Ltd/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /w\s*t\s*w/i })).toHaveAttribute('href', '/');
  });
});
