import { ComponentType } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { setActiveFilm } from '../../store/film-data/film-data';

import type { FilmIdType } from '../../types/film';

type HOCProps = {
  onUpdate: (id: FilmIdType) => void;
};

function withCatalog<T extends HOCProps>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {
  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithCatalog(props: ComponentProps): JSX.Element {
    const dispatch = useAppDispatch();

    const onFilmClick = (filmId: FilmIdType) => {
      dispatch(setActiveFilm(filmId));
    };

    return (
      <Component
        {...props as T}
        onUpdate={onFilmClick}
      />
    );
  }
  return WithCatalog;
}

export default withCatalog;
