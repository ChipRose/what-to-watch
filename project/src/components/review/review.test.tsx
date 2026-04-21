import { render, screen } from '@testing-library/react';

import { makeReview } from '../../util/mocks';
import { adaptReviewToApp } from '../../util/util-adapt-data';
import { getCustomFormat } from '../../util/util';

import Review from './review';

const testReview = makeReview();
const testAdaptedReview = adaptReviewToApp(testReview);

const testComponent = (
  <Review
    review={testAdaptedReview}
  />
);

describe('Component: Review', () => {
  it('should render correctly', () => {
    render(testComponent);

    expect(screen.getByText(new RegExp(testAdaptedReview.text, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(testAdaptedReview.author, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(getCustomFormat(testAdaptedReview.date), 'i'))).toBeInTheDocument();
    expect(screen.getByText(String(testAdaptedReview.rating))).toBeInTheDocument();
  });
});
