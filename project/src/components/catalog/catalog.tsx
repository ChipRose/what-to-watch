import { useNavigate } from 'react-router-dom';

import type { FilmIdType, FilmsType } from '../../types/film';

import { AppRoute } from '../../const/const';

import withVideoPlayer from '../../hocs/with-video-player/with-video-player';
import SmallFilmCard from '../small-film-card/small-film-card';

const SmallFilmCardWrapped = withVideoPlayer(SmallFilmCard);

type CatalogProps = {
  filmsList: FilmsType;
  onUpdate: (id: FilmIdType) => void;
}

function Catalog({ filmsList, onUpdate }: CatalogProps): JSX.Element | null {
  const navigate = useNavigate();

  if (!filmsList || !filmsList?.length) {
    return null;
  }

  const onFilmClick = (id: FilmIdType) => {
    id && navigate(`${AppRoute.Films}/${String(id)}`);
    onUpdate(id);
  };

  return (
    <div
      className='catalog__films-list'
    >
      {
        filmsList?.map((film, playerIndex) => (
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
