import { Link } from 'react-router-dom';

import { FilmPreviewType } from '../../types/film';
import { AppRoute } from '../../const/const';

type CardProps = FilmPreviewType & {
  playerIndex: number;
  renderPlayer: (previewSrc: string, playerIndex: number, poster: string) => JSX.Element;
};

function SmallFilmCard({
  id,
  playerIndex,
  poster,
  title,
  previewSrc,
  renderPlayer,
}: CardProps): JSX.Element {

  return (
    <article
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        {renderPlayer(previewSrc, playerIndex, poster)}
        <h3 className="small-film-card__title">
          <Link className="small-film-card__link" to={`${AppRoute.Films}/${id}`}>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default SmallFilmCard;
