import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';

import type { FilmIdType } from '../../types/film';

import { AppRoute } from '../../const/const';

import withVideoPlayer from '../../hocs/with-video-player/with-video-player';
import SmallFilmCard from '../small-film-card/small-film-card';

const SmallFilmCardWrapped = withVideoPlayer(SmallFilmCard);

function Catalog(): JSX.Element {
  const navigate = useNavigate();

  const catalog = useAppSelector((state) => state.catalog.films);

  const onFilmClick = (id: FilmIdType) => {
    id && navigate(`${AppRoute.Films}/${String(id)}`);
  };

  return (
    <div
      className='catalog__films-list'
    >
      {
        catalog?.map((film, playerIndex) => (
          <SmallFilmCardWrapped
            {...film}
            playerIndex={playerIndex}
            id={film.id}
            key={film.id}
            onFilmClick={onFilmClick}
          />
        ))
      }
    </div>
  );
}

export default Catalog;
