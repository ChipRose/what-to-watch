import { Link } from 'react-router-dom';

import type { FilmPreviewType, FilmIdType } from '../../types/film';

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

  const handleLinkClick = (): void => {
    onFilmClick(id);
  };

  return (
    <article
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image" onClick={handleLinkClick} >
        {renderPlayer(previewSrc, playerIndex, previewImage)}
        <h3 className="small-film-card__title">
          <Link className="small-film-card__link" to='#'>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}

export default SmallFilmCard;
