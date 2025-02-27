import { ReviewsType } from '../../types/review';

import Review from '../review/review';

type TabReviewsProps = {
  reviewsList: ReviewsType;
}

function TabReviews({ reviewsList }: TabReviewsProps): JSX.Element {
  const middleListCount: number = Math.round(reviewsList?.length / 2);
  const firstColumn = reviewsList?.slice(0, middleListCount);
  const secondColumn = reviewsList?.slice(middleListCount, reviewsList?.length);

  return (
    <div className="film-card__reviews film-card__row">
      {
        reviewsList?.length ? (
          <>
            <div className="film-card__reviews-col">
              {firstColumn?.map((reviewProps) => (
                <Review key={reviewProps?.id} review={reviewProps} />
              ))}
            </div>
            <div className="film-card__reviews-col">
              {secondColumn?.map((reviewProps) => (
                <Review key={reviewProps?.id} review={reviewProps} />
              ))}
            </div>
          </>) : ('no comments yet')
      }
    </div>
  );
}

export default TabReviews;
