import { createReducer } from '@reduxjs/toolkit';

import type { GenreStateType } from '../types/state';

import { groupByGenre } from '../util/util';

import { setGenre, setFilms, setCatalog } from './actions';
import { filmsList } from '../mocks/films';

const initialState: GenreStateType = {
  activeGenre: 'all',
  films: filmsList,
  catalog: groupByGenre(filmsList)['all'],
  activeFilm: groupByGenre(filmsList)['all'][0]
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setCatalog, (state, action) => {
      state.catalog = action.payload;
    });
});
