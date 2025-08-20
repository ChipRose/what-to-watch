import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getCatalog = (state: StateType) => state[NameSpace.Film].catalog;
export const getDefaultFilmsList = (state: StateType) =>
  state[NameSpace.Film].defaultFilmsList;
export const getGroupedFilms = (state: StateType) =>
  state[NameSpace.Film].groupedFilms;
export const getActiveFilm = (state: StateType) =>
  state[NameSpace.Film].activeFilm;
