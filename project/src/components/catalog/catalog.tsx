import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AppRoute } from '../../const/const';

import useSetActiveFilm from '../../hooks/use-set-active-film';
import withVideoPreview from '../../hocs/with-video-preview/with-video-preview';
import SmallFilmCard from '../small-film-card/small-film-card';

import type { FilmIdType, FilmsType } from '../../types/film';

const FilmPreviewWrapped = withVideoPreview(SmallFilmCard);

type CatalogProps = {
  filmsList: FilmsType;
};

function Catalog({ filmsList }: CatalogProps): JSX.Element | null {
  const navigate = useNavigate();
  const onUpdate = useSetActiveFilm();

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

export default memo(Catalog);
