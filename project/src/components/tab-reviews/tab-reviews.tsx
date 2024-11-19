import { ReviewsType } from '../../types/review';
import Review from '../review/review';

type TabReviewsProps = {
  reviewsList: ReviewsType;
}

function TabReviews({ reviewsList }: TabReviewsProps): JSX.Element {
  const middleListCount: number = Math.round(reviewsList?.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviewsList?.slice(0, middleListCount)?.map((reviewProps) => (
          <Review key={reviewProps?.id} review={reviewProps} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviewsList?.slice(middleListCount + 1, reviewsList?.length)?.map((reviewProps) => (
          <Review key={reviewProps?.id} review={reviewProps} />
        ))}
      </div>
    </div>
  );
}

export default TabReviews;
