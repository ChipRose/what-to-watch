import { useCallback } from 'react';

import { useAppDispatch } from './use-app-dispatch';
import { setActiveFilm } from '../store/reducers/film-data/film-data';

import type { FilmIdType } from '../types/film';

function useSetActiveFilm(): (id: FilmIdType) => void {
  const dispatch = useAppDispatch();

  return useCallback((filmId: FilmIdType) => {
    dispatch(setActiveFilm(filmId));
  }, [dispatch]);
}

export default useSetActiveFilm;
