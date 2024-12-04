import { createAction } from '@reduxjs/toolkit';

import type { FilmsType, FilmType } from '../types/film';
import type { GenreNameType } from '../types/film';

export const Action = {
  SET_GENRE: 'genre/set',
  SET_FILMS: 'films/set',
  SET_CATALOG: 'catalog/set',
  SET_ACTIVE_FILM: 'activeFilm/set',
};

export const setGenre = createAction<GenreNameType>(Action.SET_GENRE);
export const setFilms = createAction<FilmsType>(Action.SET_FILMS);
export const setCatalog = createAction<FilmsType>(Action.SET_CATALOG);
export const setActiveFilm = createAction<FilmType>(Action.SET_ACTIVE_FILM);
