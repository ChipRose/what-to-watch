import { FilmDescriptionType } from '../../types/film';

import { getEstimation } from '../../util/util';

type TabDescriptionProps = FilmDescriptionType;

function TabDescription({ rating, ratingCount, description, director, starring }: TabDescriptionProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getEstimation(rating)}</span>
          <span className="film-rating__count">{ratingCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>
          {description}
        </p>

        <p className="film-card__director"><strong>Director: {director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {starring.join(', ')} and other</strong>
        </p>
      </div>
    </>
  );
}

export default TabDescription;
