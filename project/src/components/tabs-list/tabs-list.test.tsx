import { render, screen } from '@testing-library/react';

import { TABS_LIST } from '../../const/const';
import { makeTestDescriptionProps, makeTestDetailsProps } from '../../util/mocks';
import { getEstimation } from '../../util/util';
import { makeReviews } from '../../util/mocks';
import { adaptReviewsToApp } from '../../util/util-adapt-data';

import TabsList from './tabs-list';

const testDescriptionProps = makeTestDescriptionProps();
const testDetailsProps = makeTestDetailsProps();
const testReviewsList = makeReviews();
const testAdaptedReviewsList = adaptReviewsToApp(testReviewsList);

const makeTestComponent = () => (
  <TabsList
    tabsList={TABS_LIST}
    descriptionProps={testDescriptionProps}
    detailsProps={testDetailsProps}
    reviewsList={testAdaptedReviewsList}
  />
);

describe('Component: TabsList', () => {
  it('should render tabs and active overview content correctly', () => {
    render(makeTestComponent());

    expect(screen.getByRole('button', { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Details/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reviews/i })).toBeInTheDocument();
  });
});
