import { Link } from 'react-router-dom';
import { generatePath } from 'react-router-dom';

import type { FilmPreview, FilmIdType } from '../../types/film';
import { AppRoute } from '../../const/const';

type CardProps = FilmPreview & {
  playerIndex: number;
  onFilmClick: (id: FilmIdType) => void;
  renderPlayer: (previewSrc: string, playerIndex: number, previewImage: string) => JSX.Element;
};

function SmallFilmCard({
  id,
  playerIndex,
  previewImage,
  title,
  previewSrc,
  onFilmClick,
  renderPlayer,
}: CardProps): JSX.Element {

  const handleCardClick = (evt: React.MouseEvent<HTMLDivElement>): void => {
    evt.preventDefault();
    id && onFilmClick(id);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
      data-testid="small-film-card"
    >
      <div className="small-film-card__image" onClick={handleCardClick} >
        {renderPlayer(previewSrc, playerIndex, previewImage)}
        <h3 className="small-film-card__title">
          <Link className="small-film-card__link" to={generatePath(AppRoute.Film, { id: String(id) })}>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default SmallFilmCard;
