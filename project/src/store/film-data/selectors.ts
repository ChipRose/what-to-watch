import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getFilms = (state: StateType) => state[NameSpace.Data].films;
export const getPromoFilm = (state: StateType) => state[NameSpace.Data].promoFilm;
export const getCatalog = (state: StateType) => state[NameSpace.Data].catalog;
export const getActiveFilm = (state: StateType) =>
  state[NameSpace.Data].activeFilm;
export const getGroupedFilms = (state: StateType) =>
  state[NameSpace.Data].groupedFilms;
export const getDefaultFilmsList = (state: StateType) =>
  state[NameSpace.Data].defaultFilmsList;
export const getIsFilmsLoaded = (state: StateType) =>
  state[NameSpace.Data].isFilmsLoaded;
export const getError = (state: StateType) => state[NameSpace.Data].error;
export const getMyList = (state: StateType) => state[NameSpace.Data].myList;