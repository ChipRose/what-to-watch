import { render, screen } from '@testing-library/react';

import ShowMoreButton from './show-more-button';

const onUpdate = jest.fn();

const testComponent = (
  <ShowMoreButton onUpdate={onUpdate} />
);

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    render(testComponent);

    expect(screen.getByRole('button', { name: /Show more/i })).toBeInTheDocument();
  });
});
