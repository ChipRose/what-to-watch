import { Link } from 'react-router-dom';

import { FilmPreview } from '../../types/film';
import { AppRoute } from '../../const/const';

type CardProps = FilmPreview & {
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
};

function SmallFilmCard({
  id,
  cover,
  title,
  onMouseMove,
  onMouseLeave
}: CardProps): JSX.Element {
  const handleMouseMove = () => {
    onMouseMove(id);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="small-film-card__image">
        <img
          src={cover}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${id}`}>
          {title}
        </Link>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
