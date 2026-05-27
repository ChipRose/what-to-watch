import { render } from '@testing-library/react';

import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const { container } = render(<Loader />);

    const loader = container.querySelector('#loader');

    expect(loader).toBeInTheDocument();
    expect(loader).toHaveClass('loader');
  });
});
