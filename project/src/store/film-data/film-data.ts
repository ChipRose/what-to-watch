import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount } from '../../const/const';

import { groupByGenre } from '../../util/util';
import {
  adaptFilmToApp, adaptFilmsDataToApp, adaptReviewsToApp
} from '../../util/util-adapt-data';

import type { FilmDataType } from '../../types/state';

import { fetchSimilarFilmAction, fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction, fetchNewReviewAction, fetchToWatchFilms, fetchAddToWatchAction } from '../api-actions';

const initialState: FilmDataType = {
  isFilmsLoaded: false,
  films: [],
  promoFilm: null,
  myList: null,
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
        state.films = films;
        state.isFilmsLoaded = true;
        state.groupedFilms = groupedFilms;
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
        state.activeFilm.similarFilms = similarFilms?.slice(0, CatalogCount.Similar) ?? [];
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

export const { setActiveFilm } = filmData.actions;

