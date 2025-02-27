import { createReducer } from '@reduxjs/toolkit';
import { setGenre, setCatalog, setActiveFilm, setUserData, resetCatalog, loadMoreToCatalog, setFilms, loadFilms, requireAuthorization, setFilmsLoadedStatus, loadReviews } from './actions';

import { CatalogCount, AuthorizationStatus } from '../const/const';
import { groupByGenre } from '../util/util';
import { adaptFilmsDataToApp, adaptReviewsToApp } from '../util/util-adapt-data';

import type { StoreType } from '../types/state';

const initialState: StoreType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isFilmsLoaded: false,
  activeGenre: 'all',
  films: [],
  defaultFilmsList: [],
  groupedFilms: null,
  userInfo: {
    avatar: ''
  },
  catalog: {
    count: CatalogCount.Init,
    films: [],
    isAllShown: false,
  },
  activeFilm: {
    film: null,
    reviews: [],
  }
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setFilmsLoadedStatus, (state, action) => {
      state.isFilmsLoaded = action.payload;
    })
    .addCase(
      loadFilms, (state, action) => {
        const activeGenre = 'all';
        const count = CatalogCount.Init;
        const adaptFilmsList = adaptFilmsDataToApp(action.payload);
        const defaultFilmsList = groupByGenre(adaptFilmsList)[activeGenre] ?? [];

        state.films = adaptFilmsList;
        state.groupedFilms = groupByGenre(adaptFilmsList);
        state.defaultFilmsList = defaultFilmsList;
        state.catalog.films = defaultFilmsList.slice(0, count);
        state.catalog.isAllShown = defaultFilmsList?.length === CatalogCount.Init;
        state.activeFilm.film = defaultFilmsList[0] || [];
      }
    )
    .addCase(loadReviews, (state, action) => {
      const adaptReviewsList = adaptReviewsToApp(action.payload);
      state.activeFilm.reviews = adaptReviewsList;
    })
    .addCase(setGenre, (state, action) => {
      const groupedFilms = state.groupedFilms || {};
      const activeGenre = action.payload;

      state.activeGenre = activeGenre;
      state.catalog.films = groupedFilms[activeGenre];
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
      state.groupedFilms = groupByGenre(action.payload);
    })
    .addCase(setUserData, (state, action) => {
      state.userInfo.avatar = action.payload?.avatarUrl ?? '';
    })
    .addCase(setCatalog, (state, action) => {
      const count = action.payload || null;
      const { activeGenre, groupedFilms } = state;
      const similarFilms = groupedFilms ? groupedFilms[activeGenre] : [];

      let catalogFilms = [];

      if (count && similarFilms?.length) {
        catalogFilms = similarFilms?.length > count ? similarFilms?.slice(0, count) : similarFilms;
      } else {
        catalogFilms = similarFilms;
      }

      state.catalog.count = count;
      state.catalog.films = catalogFilms;
      state.catalog.isAllShown = similarFilms?.length === catalogFilms?.length;
    })
    .addCase(loadMoreToCatalog, (state) => {
      const count = state.catalog.count || 0;
      const activeCatalog = state.catalog.films;
      const { activeGenre, groupedFilms } = state;
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
      state.activeFilm.film = action.payload;
    })
    .addCase(resetCatalog, (state) => {
      const { activeGenre, groupedFilms } = state;
      const similarFilms = groupedFilms ? groupedFilms[activeGenre] : [];

      state.catalog.count = null;
      state.catalog.films = similarFilms;
    });
});
