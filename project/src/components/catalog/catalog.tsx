import { useNavigate } from 'react-router-dom';

import type { FilmIdType, FilmsType } from '../../types/film';

import { AppRoute } from '../../const/const';

import withVideoPreview from '../../hocs/with-video-preview/with-video-preview';
import SmallFilmCard from '../small-film-card/small-film-card';

const FilmPreviewWrapped = withVideoPreview(SmallFilmCard);

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
          <FilmPreviewWrapped
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
