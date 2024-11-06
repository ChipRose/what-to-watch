import { FilmReviewsList } from '../../types/review';

// import ReviewCard from '../review-card/review-card';

type ReviewListProps = {
  reviewList: FilmReviewsList;
}

function ReviewsList({ reviewList }: ReviewListProps): JSX.Element {
  // const middleListCount: number = Math.round(reviewList?.length / 2);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {/* {reviewList?.slice(0, middleListCount)?.map((reviewProps) => (
          <ReviewCard key={reviewProps?.id} {...reviewProps} />
        ))} */}
      </div>
      <div className="film-card__reviews-col">
        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">
              The mannered, madcap proceedings are often delightful, occasionally silly, and here and there, gruesome and/or heartbreaking.
            </p>

            <footer className="review__details">
              <cite className="review__author">Matthew Lickona</cite>
              <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
            </footer>
          </blockquote>

          <div className="review__rating">7,2</div>
        </div>

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">
              It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.
            </p>

            <footer className="review__details">
              <cite className="review__author">Paula Fleri-Soler</cite>
              <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
            </footer>
          </blockquote>

          <div className="review__rating">7,6</div>
        </div>

        <div className="review">
          <blockquote className="review__quote">
            <p className="review__text">
              It is certainly a magical and childlike way of storytelling, even if the content is a little more adult.
            </p>

            <footer className="review__details">
              <cite className="review__author">Paula Fleri-Soler</cite>
              <time className="review__date" dateTime="2016-12-20">December 20, 2016</time>
            </footer>
          </blockquote>

          <div className="review__rating">7,0</div>
        </div>
      </div>
    </div>
  );
}

export default ReviewsList;
