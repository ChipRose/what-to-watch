import { createAction } from '@reduxjs/toolkit';

import { FilmsType } from '../types/film';
import { GenreNameType } from '../types/state';

export const Action = {
  SET_GENRE: 'genre/set',
  SET_FILMS: 'films/set',
};

export const setGenre = createAction<GenreNameType>(Action.SET_GENRE);
export const setFilms = createAction<FilmsType>(Action.SET_FILMS);
