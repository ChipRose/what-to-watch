import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount, Genre } from '../../const/const';

import type { FilmProcessType } from '../../types/state';

const initialState: FilmProcessType = {
  catalog: {
    count: CatalogCount.Init,
    activeGenre: Genre.All,
    films: [],
    isAllShown: false,
  },
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setCatalogData: (state, action) => {
      state.catalog = { ...state.catalog, ...action.payload };
    },
    loadMoreToCatalog: (state, action) => {
      const count = state.catalog.count || 0;
      const activeCatalog = state.catalog.films ?? [];
      const activeFilms = action.payload ? action.payload : [];

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
});

export const { setCatalogData, loadMoreToCatalog } = filmProcess.actions;