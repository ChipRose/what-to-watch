import { createReducer } from '@reduxjs/toolkit';
import { setGenre, setFilms, setCatalog, setActiveFilm, setReviews, setActiveReviews } from './actions';

import type { GenreStateType } from '../types/state';
import type { FilmsType } from '../types/film';

import { filmsList } from '../mocks/films';
import { reviewsList } from '../mocks/review';

import { groupByGenre, getItemsByKey } from '../util/util';

const defaultFilmsList: FilmsType = groupByGenre(filmsList)['all'];

const initialState: GenreStateType = {
  activeGenre: 'all',
  films: filmsList,
  catalog: defaultFilmsList,
  reviews: reviewsList,
  activeFilm: {
    film: defaultFilmsList[0],
    reviews: getItemsByKey([defaultFilmsList[0].id], reviewsList, 'filmId')
  }
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(setFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setCatalog, (state, action) => {
      state.catalog = action.payload;
    })
    .addCase(setActiveFilm, (state, action) => {
      state.activeFilm.film = action.payload;
    })
    .addCase(setActiveReviews, (state, action) => {
      state.activeFilm.reviews = action.payload;
    });
});
