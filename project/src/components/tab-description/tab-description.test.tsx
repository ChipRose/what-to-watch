import { render, screen } from '@testing-library/react';

import { makeTestDescriptionProps } from '../../util/mocks';
import { getEstimation } from '../../util/util';

import TabDescription from './tab-description';

const testDescriptionProps = makeTestDescriptionProps();

const makeTestComponent = () => (
  <TabDescription
    {...testDescriptionProps}
  />
);

describe('Component: TabDescription', () => {
  it('should render description block correctly', () => {
    render(makeTestComponent());

    expect(screen.getByText(new RegExp(testDescriptionProps.rating.toString(), 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(getEstimation(testDescriptionProps.rating), 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`${testDescriptionProps.ratingCount} ratings`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testDescriptionProps.description, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Director: ${testDescriptionProps.director}`, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`Starring: ${testDescriptionProps.starring.join(', ')} and other`, 'i'))).toBeInTheDocument();
  });
});
