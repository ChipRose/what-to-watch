import { createAction } from '@reduxjs/toolkit';

import type { FilmsType, FilmType } from '../types/film';
import type { ReviewsType } from '../types/review';
import type { GenreNameType } from '../types/film';

export const Action = {
  SET_GENRE: 'genre/set',
  SET_FILMS: 'films/set',
  SET_REVIEWS: 'reviews/set',
  SET_CATALOG: 'catalog/set',
  SET_ACTIVE_FILM: 'activeFilm/set',
  SET_ACTIVE_REVIEWS: 'activeReviews/set',
};

export const setGenre = createAction<GenreNameType>(Action.SET_GENRE);
export const setFilms = createAction<FilmsType>(Action.SET_FILMS);
export const setReviews = createAction<ReviewsType>(Action.SET_REVIEWS);
export const setCatalog = createAction<FilmsType>(Action.SET_CATALOG);
export const setActiveFilm = createAction<FilmType>(Action.SET_ACTIVE_FILM);
export const setActiveReviews = createAction<ReviewsType>(Action.SET_ACTIVE_REVIEWS);
