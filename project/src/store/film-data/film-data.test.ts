import { filmData } from './film-data';

import { groupByGenre } from '../../util/util';
import { adaptFilmToApp } from '../../util/util-adapt-data';
import { makeTestFilms, makeTestFilm } from '../../util/mocks';

import { fetchPromoFilmAction, fetchFilmsAction } from '../api-actions';

import type { FilmDataType } from '../../types/state';
import type { FilmsType } from '../../types/film';

const mockFilm = makeTestFilm();
const mockFilms = makeTestFilms();
const mockAdaptedFilm = adaptFilmToApp(mockFilm);
const mockAdaptedFilms = mockFilms.map(adaptFilmToApp);
const mockGroupedFilms = groupByGenre(mockAdaptedFilms as FilmsType);

describe('Reducer: filmData', () => {
  let initialState: FilmDataType;

  beforeEach(() => {
    initialState = {
      isFilmsLoaded: false,
      films: null,
      promoFilm: null,
      myList: null,
      groupedFilms: null,
      activeFilm: {
        film: null,
        reviews: null,
        similarFilms: null,
      }
    };
  });

  it('should update PROMO film by load promo film', () => {
    expect(filmData.reducer(initialState, { type: fetchPromoFilmAction.fulfilled.type, payload: mockFilm }))
      .toEqual({ films: null, isFilmsLoaded: false, groupedFilms: null, activeFilm: { film: mockAdaptedFilm, reviews: null, similarFilms: null }, promoFilm: mockAdaptedFilm, myList: null });
  });

  it('should update FILMS by load films', () => {
    expect(filmData.reducer(initialState, { type: fetchFilmsAction.fulfilled.type, payload: mockFilms }))
      .toEqual({ films: mockAdaptedFilms, isFilmsLoaded: true, groupedFilms: mockGroupedFilms, activeFilm: { film: null, reviews: null, similarFilms: null }, promoFilm: null, myList: null });
  });
});