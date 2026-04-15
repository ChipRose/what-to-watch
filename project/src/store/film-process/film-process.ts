import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount, EMPTY_CATALOG } from '../../const/const';

import type { FilmProcessType } from '../../types/state';
import type { FilmsType, CatalogDataType } from '../../types/film';

const initialState: FilmProcessType = {
  catalog: EMPTY_CATALOG,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
    setCatalogData: (state: FilmProcessType, action: PayloadAction<Partial<CatalogDataType>>) => {
      if (action.payload.count !== undefined) {
        state.catalog.count = action.payload.count;
      }
      if (action.payload.activeGenre !== undefined) {
        state.catalog.activeGenre = action.payload.activeGenre;
      }
      if (action.payload.films !== undefined) {
        state.catalog.films = action.payload.films;
      }
      if (action.payload.isAllShown !== undefined) {
        state.catalog.isAllShown = action.payload.isAllShown;
      }
    },
    loadMoreToCatalog: (state: FilmProcessType, action: PayloadAction<FilmsType | null>) => {
      const count = state.catalog.count || 0;
      const activeCatalog = state.catalog.films ?? [];
      const activeFilms = action.payload ?? [];

      let catalogFilms: FilmsType = [];

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
  }
});

export const { setCatalogData, loadMoreToCatalog } = filmProcess.actions;
