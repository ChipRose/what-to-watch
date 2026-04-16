import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getFilms = (state: StateType) => state[NameSpace.Data].films;
export const getPromoFilm = (state: StateType) => state[NameSpace.Data].promoFilm;
export const getActiveFilm = (state: StateType) =>
  state[NameSpace.Data].activeFilm;
export const getActiveFilmItem = (state: StateType) =>
  state[NameSpace.Data].activeFilm.film;
export const getActiveReviews = (state: StateType) =>
  state[NameSpace.Data].activeFilm.reviews;
export const getSimilarFilms = (state: StateType) =>
  state[NameSpace.Data].activeFilm.similarFilms;
export const getGroupedFilms = (state: StateType) =>
  state[NameSpace.Data].groupedFilms;
export const getIsFilmsLoaded = (state: StateType) =>
  state[NameSpace.Data].isDataLoaded;
export const getMyList = (state: StateType) => state[NameSpace.Data].myList;
