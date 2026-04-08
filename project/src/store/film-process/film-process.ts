import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { NameSpace, CatalogCount, Genre } from '../../const/const';
import { getCatalogData } from '../../util/util';
import { adaptFilmsDataToApp } from '../../util/util-adapt-data';
import { fetchFilmsAction } from '../api-actions';

import type { FilmProcessType } from '../../types/state';
import type { FilmsType } from '../../types/film';

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
    setCatalogData: (state, action: PayloadAction<Partial<FilmProcessType['catalog']>>) => {
      state.catalog = { ...state.catalog, ...action.payload };
    },
    loadMoreToCatalog: (state, action: PayloadAction<FilmsType | null>) => {
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFilmsAction.fulfilled, (state, action) => {
      const films = adaptFilmsDataToApp(action.payload) ?? [];
      const catalogData = getCatalogData(films, Genre.All, CatalogCount.Init);
      state.catalog = {
        ...catalogData,
        activeGenre: Genre.All,
      };
    });
  }
});

export const { setCatalogData, loadMoreToCatalog } = filmProcess.actions;
