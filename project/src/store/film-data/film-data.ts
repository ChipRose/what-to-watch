import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/const';
import {
  // adaptFilmToApp,
  adaptFilmsDataToApp,
  // adaptReviewsToApp
} from '../../util/util-adapt-data';

import type { FilmDataType } from '../../types/state';

import { fetchFilmsAction } from '../api-actions';

const initialState: FilmDataType = {
  error: null,
  isFilmsLoaded: false,
  films: [],
  myList: [],
};


export const filmData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.films = null;
        state.isFilmsLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = adaptFilmsDataToApp(action.payload);
        state.isFilmsLoaded = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.films = null;
        state.isFilmsLoaded = false;
      });

    // .addCase(loadFilm, (state, action) => {
    //   state.activeFilm.film = adaptFilmToApp(action.payload);

    // })
    // .addCase(loadSimilarFilms, (state, action) => {
    //   const adaptSimilarFilmsList = adaptFilmsDataToApp(action.payload);

    //   state.activeFilm.similarFilms = adaptSimilarFilmsList;

    //   if (adaptSimilarFilmsList?.length > CatalogCount.Similar) {
    //     state.activeFilm.similarFilms = adaptSimilarFilmsList.slice(0, CatalogCount.Similar);
    //   } else {
    //     state.activeFilm.similarFilms = adaptSimilarFilmsList;
    //   }
    // })
    // .addCase(loadFilms, (state, action) => {
    //   const activeGenre = 'all';
    //   const count = CatalogCount.Init;
    //   const adaptFilmsList = adaptFilmsDataToApp(action.payload);
    //   const defaultFilmsList = groupByGenre(adaptFilmsList)[activeGenre] ?? [];

    //   state.films = adaptFilmsList;
    //   state.groupedFilms = groupByGenre(adaptFilmsList);
    //   state.defaultFilmsList = defaultFilmsList;
    //   state.catalog.films = defaultFilmsList.slice(0, count);
    //   state.catalog.isAllShown = defaultFilmsList?.length === CatalogCount.Init;
    // })
    // .addCase(loadToWatchFilms, (state, action) => {
    //   const adaptMyFilmsList = adaptFilmsDataToApp(action.payload);

    //   state.myList = adaptMyFilmsList;
    // })
    // .addCase(loadPromoFilm, (state, action) => {
    //   state.activeFilm.film = adaptFilmToApp(action.payload);
    // })
    // .addCase(loadReviews, (state, action) => {
    //   const adaptReviewsList = adaptReviewsToApp(action.payload);
    //   state.activeFilm.reviews = adaptReviewsList;
    // })
    // .addCase(loadActiveFilm, (state, action) => {
    //   state.activeFilm.film = adaptFilmToApp(action.payload);
    // })
  }
});
