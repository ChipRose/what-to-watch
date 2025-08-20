import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount, Genre } from '../../const/const';
import { groupByGenre } from '../../util/util';

import {
  adaptFilmToApp,
  adaptFilmsDataToApp,
  // adaptReviewsToApp
} from '../../util/util-adapt-data';

import { fetchPromoFilmAction } from '../api-actions';

import type { FilmDataType } from '../../types/state';

import { fetchFilmsAction } from '../api-actions';

const initialState: FilmDataType = {
  error: null,
  isFilmsLoaded: false,
  films: [],
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.activeFilm.film = null;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.activeFilm.film = adaptFilmToApp(action.payload);
      })
      .addCase(fetchFilmsAction.pending, (state) => {
        state.films = null;
        state.isFilmsLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        const films = adaptFilmsDataToApp(action.payload);
        const groupedFilms = groupByGenre(films);
        const count = CatalogCount.Init;
        const activeGenre = Genre.All;
        const activeFilms = groupedFilms ? groupedFilms[activeGenre] : [];
        let catalogFilms = [];

        state.films = films;
        state.isFilmsLoaded = false;
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
