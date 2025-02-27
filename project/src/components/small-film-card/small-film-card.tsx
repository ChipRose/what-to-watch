import { Link } from 'react-router-dom';

import type { FilmPreviewType, FilmIdType } from '../../types/film';
import type { LinkEvent } from '../../types/form';


type CardProps = FilmPreviewType & {
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

  const handleLinkClick = (evt:LinkEvent): void => {
    evt.preventDefault();
    onFilmClick(id);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        {renderPlayer(previewSrc, playerIndex, previewImage)}
        <h3 className="small-film-card__title">
          <Link className="small-film-card__link" onClick={handleLinkClick} to='#'>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default SmallFilmCard;
