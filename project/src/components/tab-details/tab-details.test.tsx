import { render, screen } from '@testing-library/react';

import { makeTestDetailsProps } from '../../util/mocks';
import { formatTime } from '../../util/util';

import TabDetails from './tab-details';

const testDetailsProps = makeTestDetailsProps();

const makeTestComponent = () => (
    <TabDetails
      {...testDetailsProps}
    />
);

describe('Component: TabDetails', () => {
  it('should render main details correctly', () => {
    render(makeTestComponent());

    expect(screen.getByText(/^Director$/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testDetailsProps.director, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Starring/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testDetailsProps.starring.join(', '), 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Genre/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testDetailsProps.genre, 'i'))).toBeInTheDocument();
    expect(screen.getByText(/^Released$/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testDetailsProps.releaseDate.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(formatTime(testDetailsProps.runTime), 'i'))).toBeInTheDocument();
  });
});
