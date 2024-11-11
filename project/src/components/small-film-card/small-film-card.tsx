import { Link } from 'react-router-dom';

import { Film } from '../../types/film';
import { AppRoute } from '../../const/const';
import VideoPlayer from '../video-player/video-player';

type CardProps = Film & {
  isPlaying: boolean;
  onMouseMove: (id: number) => void;
  onMouseLeave: () => void;
};

function SmallFilmCard({
  id,
  cover,
  title,
  src,
  isPlaying,
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
        <VideoPlayer
          width={280}
          height={175}
          poster={cover}
          src={src}
          isPlaying={isPlaying}
        />
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
