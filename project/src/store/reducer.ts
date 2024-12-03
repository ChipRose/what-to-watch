import { createReducer } from '@reduxjs/toolkit';

import { GenreStateType } from '../types/state';

import { setGenre, setFilms } from './actions';

const initialState: GenreStateType = {
  genre: null,
  films: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    });
});
