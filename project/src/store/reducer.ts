import { createReducer } from '@reduxjs/toolkit';
import { setGenre, setError, setCatalog, setActiveFilm, setReviews, resetCatalog, loadMoreToCatalog, setFilms, loadFilms, requireAuthorization } from './actions';

import { CatalogCount, AuthorizationStatus } from '../const/const';

import type { StoreType } from '../types/state';

import { reviewsList } from '../mocks/review';

import { groupByGenre, getItemsByKey } from '../util/util';


const initialState: StoreType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isLoading: false,
  activeGenre: 'all',
  films: [],
  defaultFilmsList: [],
  groupedFilms: null,
  catalog: {
    count: CatalogCount.Init,
    films: [],
    isAllShown: false,
  },
  reviews: reviewsList,
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
    .addCase(
      loadFilms, (state, action) => {
        const activeGenre = 'all';
        const defaultFilmsList = groupByGenre(action.payload)[activeGenre] ?? [];

        state.films = action.payload;
        state.groupedFilms = groupByGenre(action.payload);
        state.defaultFilmsList = defaultFilmsList;
        state.catalog.films = defaultFilmsList;
        state.catalog.isAllShown = defaultFilmsList?.length === CatalogCount.Init;
        state.activeFilm.film = defaultFilmsList[0] || [];
        state.activeFilm.reviews = getItemsByKey([defaultFilmsList[0]?.id], reviewsList, 'filmId');

        state.groupedFilms = groupByGenre(action.payload);
      }
    )
    .addCase(setError, (state, action) => {
      state.error = action.payload;
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
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
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
      const activeFilm = action.payload;
      const activeId = activeFilm.id;
      const reviews = state.reviews;
      const activeReviews = getItemsByKey([activeId], reviews, 'filmId');

      state.activeFilm.film = action.payload;
      state.activeFilm.reviews = activeReviews;
    })
    .addCase(resetCatalog, (state) => {
      const { activeGenre, groupedFilms } = state;
      const similarFilms = groupedFilms ? groupedFilms[activeGenre] : [];

      state.catalog.count = null;
      state.catalog.films = similarFilms;
    });
});
