import { FilmPreview } from '../../types/film';

type CardProps = FilmPreview & {
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
};

function SmallFilmCard({
  id,
  cover,
  title,
  src,
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
        <a className="small-film-card__link" href={src}>
          {title}
        </a>
      </h3>
    </article>
  );
}

export default SmallFilmCard;
