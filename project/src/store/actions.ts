import { createAction } from '@reduxjs/toolkit';

import type { FilmsType, FilmType } from '../types/film';
import type { ReviewsType } from '../types/review';
import type { GenreNameType } from '../types/film';

export const Action = {
  SET_GENRE: 'genre/set',
  SET_FILMS: 'films/set',
  SET_REVIEWS: 'reviews/set',
  SET_CATALOG: 'catalog/set',
  LOAD_MORE_FILMS: 'catalog/load',
  RESET_CATALOG: 'catalog/reset',
  RESET_APP: 'app/reset',
  SET_ACTIVE_FILM: 'activeFilm/set',
};

export const setGenre = createAction<GenreNameType>(Action.SET_GENRE);
export const setFilms = createAction<FilmsType>(Action.SET_FILMS);
export const setReviews = createAction<ReviewsType>(Action.SET_REVIEWS);
export const setCatalog = createAction<number>(Action.SET_CATALOG);
export const loadMoreToCatalog = createAction(Action.LOAD_MORE_FILMS);
export const setActiveFilm = createAction<FilmType>(Action.SET_ACTIVE_FILM);
export const resetCatalog = createAction(Action.RESET_CATALOG);
export const resetApp = createAction(Action.RESET_APP);
