import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount, Genre } from '../../const/const';

import { groupByGenre } from '../../util/util';
import {
  adaptFilmToApp, adaptFilmsDataToApp, adaptReviewsToApp
} from '../../util/util-adapt-data';

import type { FilmDataType } from '../../types/state';

import { fetchSimilarFilmAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchNewReviewAction, fetchToWatchFilms, fetchAddToWatchAction } from '../api-actions';

const initialState: FilmDataType = {
  error: null,
  isFilmsLoaded: false,
  films: [],
  promoFilm: null,
  myList: null,
  catalog: {
    count: CatalogCount.Init,
    activeGenre: Genre.All,
    films: [],
    isAllShown: false,
  },
  defaultFilmsList: null,
  groupedFilms: null,
  activeFilm: {
    film: null,
    reviews: null,
    similarFilms: [],
  },
};


export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    setActiveFilm: (state, action) => {
      const activeFilm = state.films?.find((film) => film.id === action.payload) ?? null;
      state.activeFilm.film = activeFilm;
    },
    setActiveGenre: (state, action) => {
      state.catalog.activeGenre = action.payload;
    },
    setCatalog: (state, action) => {
      const count = action.payload || null;
      const activeGenre = state.catalog.activeGenre;
      const groupedFilms = state.groupedFilms;
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

    },
    loadMoreToCatalog: (state) => {
      const count = state.catalog.count || 0;
      const activeCatalog = state.catalog.films ?? [];
      const groupedFilms = state.groupedFilms;
      const activeGenre = state.catalog.activeGenre;
      const activeFilms = groupedFilms ? groupedFilms[activeGenre] : [];

      let catalogFilms = [];

      if (activeFilms?.length && (activeFilms?.length - activeCatalog?.length > CatalogCount.Init)) {
        catalogFilms = activeFilms?.slice(0, count + CatalogCount.Init);
        state.catalog.count = count + CatalogCount.Init;
      } else {
        state.catalog.count = activeFilms?.length;
        catalogFilms = activeFilms;
      }

      state.catalog.films = catalogFilms;
      state.catalog.isAllShown = Boolean(state.catalog.count === activeFilms?.length);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.activeFilm.film = action.payload ? adaptFilmToApp(action.payload) : null;
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promoFilm = null;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = adaptFilmToApp(action.payload);
        state.activeFilm.film = state.promoFilm;
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.films = null;
        state.isFilmsLoaded = false;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        const films = adaptFilmsDataToApp(action.payload) ?? [];
        const groupedFilms = groupByGenre(films);
        const count = CatalogCount.Init;
        const activeGenre = Genre.All;
        const activeFilms = groupedFilms ? groupedFilms[activeGenre] : [];
        let catalogFilms = [];

        state.films = films;
        state.isFilmsLoaded = true;
        state.groupedFilms = groupedFilms;
        state.catalog.activeGenre = activeGenre;
        state.catalog.count = CatalogCount.Init;
        state.catalog.isAllShown = activeFilms.length === CatalogCount.Init;

        if (count && activeFilms?.length) {
          catalogFilms = activeFilms?.length > count ? activeFilms?.slice(0, count) : activeFilms;
        } else {
          catalogFilms = activeFilms;
        }
        state.catalog.films = catalogFilms;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.films = null;
        state.isFilmsLoaded = true;
      })
      .addCase(fetchSimilarFilmAction.pending, (state) => {
        state.activeFilm.similarFilms = null;
      })
      .addCase(fetchSimilarFilmAction.fulfilled, (state, action) => {
        const similarFilms = action.payload ? adaptFilmsDataToApp(action.payload) : [];
        state.activeFilm.similarFilms = similarFilms;
      })
      .addCase(fetchSimilarFilmAction.rejected, (state) => {
        state.activeFilm.similarFilms = [];
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.activeFilm.reviews = null;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.activeFilm.reviews = action.payload ? adaptReviewsToApp(action.payload) : [];
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.activeFilm.reviews = null;
      })
      .addCase(fetchNewReviewAction.pending, (state) => {
        state.activeFilm.reviews = null;
      })
      .addCase(fetchNewReviewAction.fulfilled, (state, action) => {
        state.activeFilm.reviews = action.payload ? adaptReviewsToApp(action.payload) : [];
      })
      .addCase(fetchToWatchFilms.fulfilled, (state, action) => {
        state.myList = adaptFilmsDataToApp(action.payload) ?? [];
      })
      .addCase(fetchAddToWatchAction.fulfilled, (state, action) => {
        state.activeFilm.film = adaptFilmToApp(action.payload) ?? null;
      });
  }
});

export const { setActiveFilm, setActiveGenre, setCatalog, loadMoreToCatalog } = filmData.actions;
