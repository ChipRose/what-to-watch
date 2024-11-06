import { Review } from '../../types/review';
import { getCustomFormat } from '../../util/util';

type ReviewCardProps = {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps): JSX.Element {

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">
          {
            review?.text
          }
        </p>

        <footer className="review__details">
          <cite className="review__author">{
            review?.author
          }
          </cite>
          <time className="review__date" dateTime={review?.date?.toString()}>
            {getCustomFormat(review?.date)}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{review?.rating}</div>
    </div>
  );
}

export default ReviewCard;
