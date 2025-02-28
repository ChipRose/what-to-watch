import { createReducer } from '@reduxjs/toolkit';
import { loadPromoFilm, loadFilm, loadSimilarFilms, setGenre, setCatalog, setActiveFilm, setUserData, loadMoreToCatalog, loadFilms, requireAuthorization, setFilmsLoadedStatus, loadReviews } from './actions';

import { FilmType } from '../types/film';

import { CatalogCount, AuthorizationStatus } from '../const/const';
import { groupByGenre } from '../util/util';
import { adaptFilmToApp, adaptFilmsDataToApp, adaptReviewsToApp } from '../util/util-adapt-data';

import type { StoreType } from '../types/state';

const initialState: StoreType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isFilmsLoaded: false,
  films: [],
  defaultFilmsList: [],
  groupedFilms: null,
  userInfo: {
    avatar: ''
  },
  catalog: {
    count: CatalogCount.Init,
    activeGenre: 'all',
    films: [],
    isAllShown: false,
  },
  activeFilm: {
    film: null,
    reviews: [],
    similarFilms: [],
  },
  promoFilm: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setFilmsLoadedStatus, (state, action) => {
      state.isFilmsLoaded = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.activeFilm.film = adaptFilmToApp(action.payload);

    })
    .addCase(loadSimilarFilms, (state, action) => {
      const adaptSimilarFilmsList = adaptFilmsDataToApp(action.payload);

      state.activeFilm.similarFilms = adaptSimilarFilmsList;

      if (adaptSimilarFilmsList?.length > CatalogCount.Similar) {
        state.activeFilm.similarFilms = adaptSimilarFilmsList.slice(0, CatalogCount.Similar);
      } else {
        state.activeFilm.similarFilms = adaptSimilarFilmsList;
      }
    })
    .addCase(loadFilms, (state, action) => {
      const activeGenre = 'all';
      const count = CatalogCount.Init;
      const adaptFilmsList = adaptFilmsDataToApp(action.payload);
      const defaultFilmsList = groupByGenre(adaptFilmsList)[activeGenre] ?? [];

      state.films = adaptFilmsList;
      state.groupedFilms = groupByGenre(adaptFilmsList);
      state.defaultFilmsList = defaultFilmsList;
      state.catalog.films = defaultFilmsList.slice(0, count);
      state.catalog.isAllShown = defaultFilmsList?.length === CatalogCount.Init;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = adaptFilmToApp(action.payload);
    })
    .addCase(loadReviews, (state, action) => {
      const adaptReviewsList = adaptReviewsToApp(action.payload);
      state.activeFilm.reviews = adaptReviewsList;
    })
    .addCase(setGenre, (state, action) => {
      const groupedFilms = state.groupedFilms || {};
      const activeGenre = action.payload;

      state.catalog.activeGenre = activeGenre;
      state.catalog.films = groupedFilms[activeGenre];
    })
    .addCase(setUserData, (state, action) => {
      state.userInfo.avatar = action.payload?.avatarUrl ?? '';
    })
    .addCase(setCatalog, (state, action) => {
      const count = action.payload || null;
      const { groupedFilms } = state;
      const { activeGenre } = state.catalog;
      const sameGenreFilms = groupedFilms ? groupedFilms[activeGenre] : [];

      let catalogFilms = [];

      if (count && sameGenreFilms?.length) {
        catalogFilms = sameGenreFilms?.length > count ? sameGenreFilms?.slice(0, count) : sameGenreFilms;
      } else {
        catalogFilms = sameGenreFilms;
      }

      state.catalog.count = count;
      state.catalog.films = catalogFilms;
      state.catalog.isAllShown = sameGenreFilms?.length === catalogFilms?.length;
    })
    .addCase(loadMoreToCatalog, (state) => {
      const count = state.catalog.count || 0;
      const activeCatalog = state.catalog.films;
      const { groupedFilms } = state;
      const { activeGenre } = state.catalog;
      const similarFilms = groupedFilms ? groupedFilms[activeGenre] : [];

      let catalogFilms = [];

      if (similarFilms?.length && (similarFilms?.length - activeCatalog?.length > CatalogCount.Init)) {
        catalogFilms = similarFilms?.slice(0, count + CatalogCount.Init);
        state.catalog.count = count + CatalogCount.Init;
      } else {
        state.catalog.count = similarFilms?.length;
        catalogFilms = similarFilms;
      }

      state.catalog.films = catalogFilms;
      state.catalog.isAllShown = Boolean(state.catalog.count === similarFilms?.length);
    })
    .addCase(setActiveFilm, (state, action) => {
      const { films } = state;
      const pageId = action.payload;
      const activeFilm = films?.find(({ id: filmId }) => filmId === pageId) as FilmType;

      state.activeFilm.film = activeFilm;
    });
});
