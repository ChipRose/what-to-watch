import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount, Genre } from '../../const/const';

import { groupByGenre } from '../../util/util';
import {
  adaptFilmToApp, adaptFilmsDataToApp, adaptReviewsToApp
} from '../../util/util-adapt-data';

import type { FilmDataType } from '../../types/state';

import { fetchFilmAction, fetchFilmsAction, fetchPromoFilmAction, fetchReviewsAction } from '../api-actions';

const initialState: FilmDataType = {
  error: null,
  isFilmsLoaded: false,
  films: [],
  promoFilm: null,
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
      const activeCatalog = state.catalog.films;
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
        state.activeFilm.film = adaptFilmToApp(action.payload);
      })
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.promoFilm = null;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = adaptFilmToApp(action.payload);
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
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        const reviews = adaptReviewsToApp(action.payload);
        state.activeFilm.reviews = reviews;
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

export const { setActiveFilm, setActiveGenre, setCatalog, loadMoreToCatalog } = filmData.actions;
