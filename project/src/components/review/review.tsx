import { ReviewType } from '../../types/review';

import { getCustomFormat } from '../../util/util';

type ReviewProps = {
  review: ReviewType;
}

function Review({ review }: ReviewProps): JSX.Element {
  const { text, author, date, rating } = review;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {
            text
          }
        </p>

        <footer className="review__details">
          <cite className="review__author">{
            author
          }
          </cite>
          <time className="review__date" dateTime={review?.date?.toString()}>
            {getCustomFormat(date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Review;
