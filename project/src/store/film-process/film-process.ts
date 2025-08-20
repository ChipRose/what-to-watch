import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/const';

// import { groupByGenre } from '../../util/util';
// import { adaptFilmToApp, adaptFilmsDataToApp } from '../../util/util-adapt-data';

import type { FilmProcessType } from '../../types/state';


const initialState: FilmProcessType = {
  myList: [],
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    // setGenre:  (state, action) => {
    //   const groupedFilms = state.groupedFilms || {};
    //   const activeGenre = action.payload;

    //   state.catalog.activeGenre = activeGenre;
    //   state.catalog.films = groupedFilms[activeGenre];
    // },
    // setActiveFilm: (state, action) => {
    // eslint-disable-next-line no-console
    // console.log('setActiveFilm', action.payload);
    //   state.activeFilm.film = action.payload;
    // },
    // setCatalog: (state, action) => {
    //   const count = action.payload || null;
    //   const { activeGenre } = state.catalog;
    //   const sameGenreFilms = groupedFilms ? groupedFilms[activeGenre] : [];

    //   let catalogFilms = [];

    //   if (count && sameGenreFilms?.length) {
    //     catalogFilms = sameGenreFilms?.length > count ? sameGenreFilms?.slice(0, count) : sameGenreFilms;
    //   } else {
    //     catalogFilms = sameGenreFilms;
    //   }

    //   state.catalog.count = count;
    //   state.catalog.films = catalogFilms;
    //   state.catalog.isAllShown = sameGenreFilms?.length === catalogFilms?.length;

    // },
    // loadMoreToCatalog: (state, action) => {
    //   const count = state.catalog.count || 0;
    //   const activeCatalog = state.catalog.films;
    //   const { groupedFilms } = state;
    //   const { activeGenre } = state.catalog;
    //   const similarFilms = groupedFilms ? groupedFilms[activeGenre] : [];

    //   let catalogFilms = [];

    //   if (similarFilms?.length && (similarFilms?.length - activeCatalog?.length > CatalogCount.Init)) {
    //     catalogFilms = similarFilms?.slice(0, count + CatalogCount.Init);
    //     state.catalog.count = count + CatalogCount.Init;
    //   } else {
    //     state.catalog.count = similarFilms?.length;
    //     catalogFilms = similarFilms;
    //   }

    //   state.catalog.films = catalogFilms;
    //   state.catalog.isAllShown = Boolean(state.catalog.count === similarFilms?.length);
    // }
  },
  // extraReducers(builder) {

  // }
});

// export const { setActiveFilm } = filmProcess.actions;
