import { render, screen } from '@testing-library/react';

import { makeReviews } from '../../util/mocks';
import { adaptReviewsToApp } from '../../util/util-adapt-data';
import TabReviews from './tab-reviews';

import type { ReviewsType } from '../../types/review';

const testReviews = makeReviews();
const testAdaptedReviews = adaptReviewsToApp(testReviews) ?? [];

const makeTestComponent = (reviewsList: ReviewsType = testAdaptedReviews) => (
  <TabReviews reviewsList={reviewsList} />
);

describe('Component: TabReviews', () => {
  it('should render reviews correctly', () => {
    render(makeTestComponent());

    expect(screen.getByText(new RegExp(testAdaptedReviews[0].text, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testAdaptedReviews[1].text, 'i'))).toBeInTheDocument();
  });

  it('should render empty state correctly', () => {
    render(makeTestComponent(null));

    expect(screen.getByText(/no comments yet/i)).toBeInTheDocument();
  });
});
