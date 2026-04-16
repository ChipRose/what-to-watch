import { filmData } from './film-data';
import { CatalogCount } from '../../const/const';

import { groupByGenre } from '../../util/util';
import { adaptFilmToApp, adaptReviewsToApp } from '../../util/util-adapt-data';
import { setActiveFilm } from './film-data';
import { makeTestFilms, makeTestFilm, makeReviews } from '../../util/mocks';

import { fetchPromoFilmAction, fetchFilmsAction, fetchFilmAction, fetchReviewsAction, fetchSimilarFilmAction, fetchToWatchFilms, fetchAddToWatchAction, fetchNewReviewAction } from '../api-actions';

import type { FilmDataType } from '../../types/state';
import type { FilmsType } from '../../types/film';

const mockFilm = makeTestFilm();
const mockFilms = makeTestFilms();
const mockReviews = makeReviews();
const mockAdaptedFilm = adaptFilmToApp(mockFilm);
const mockAdaptedFilms: FilmsType = mockFilms.map((film) => adaptFilmToApp(film)!);
const mockGroupedFilms = groupByGenre(mockAdaptedFilms);
const mockAdaptedReviews = adaptReviewsToApp(mockReviews);

describe('Reducer: filmData', () => {
  let initialState: FilmDataType;
  let someNewState: FilmDataType;

  beforeEach(() => {
    initialState = {
      isDataLoaded: false,
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

    someNewState = { ...initialState, promoFilm: mockAdaptedFilm, groupedFilms: mockGroupedFilms, activeFilm: { film: mockAdaptedFilm, reviews: mockAdaptedReviews, similarFilms: mockAdaptedFilms.slice(0, CatalogCount.Similar) } };
  });

  it('should return initial state when passed an empty action', () => {
    expect(filmData.reducer(undefined, { type: '' })).toEqual({
      isDataLoaded: false,
      films: null,
      promoFilm: null,
      myList: null,
      groupedFilms: null,
      activeFilm: {
        film: null,
        reviews: null,
        similarFilms: null,
      }
    });
  });

  it('should set active film', () => {
    const filmId = mockAdaptedFilms[0].id;
    const expectedFilm = mockAdaptedFilms.find((film) => film.id === filmId) ?? null;

    expect(filmData.reducer({ ...initialState, films: mockAdaptedFilms }, { type: setActiveFilm.type, payload: filmId }))
      .toEqual({ ...initialState, films: mockAdaptedFilms, activeFilm: { film: expectedFilm, reviews: null, similarFilms: null } });
  });

  it('should set active film to null when id is not found', () => {
    expect(filmData.reducer({ ...someNewState, films: mockAdaptedFilms }, { type: setActiveFilm.type, payload: -1 }))
      .toEqual({ ...someNewState, films: mockAdaptedFilms, activeFilm: { ...someNewState.activeFilm, film: null } });
  });

  it('should reset PROMO film to null when pending', () => {
    expect(filmData.reducer(someNewState, { type: fetchPromoFilmAction.pending.type }))
      .toEqual({ ...someNewState, promoFilm: null });
  });

  it('should update PROMO film by load promo film', () => {
    expect(filmData.reducer(initialState, { type: fetchPromoFilmAction.fulfilled.type, payload: mockFilm }))
      .toEqual({ ...initialState, promoFilm: mockAdaptedFilm });
  });

  it('should update FILMS by load films', () => {
    expect(filmData.reducer(initialState, { type: fetchFilmsAction.fulfilled.type, payload: mockAdaptedFilms }))
      .toEqual({ ...initialState, films: mockAdaptedFilms, isDataLoaded: true, groupedFilms: mockGroupedFilms });
  });

  it('should reset FILMS and loading status by load films pending', () => {
    expect(filmData.reducer(someNewState , { type: fetchFilmsAction.pending.type }))
      .toEqual({ ...someNewState, films: null, groupedFilms: null, isDataLoaded: false });
  });

  it('should reset FILMS and set loading status by load films rejected', () => {
    expect(filmData.reducer(someNewState , { type: fetchFilmsAction.rejected.type }))
      .toEqual({ ...someNewState, films: null, groupedFilms: null, isDataLoaded: true });
  });

  it('should update FILM by load film', () => {
    expect(filmData.reducer(initialState, { type: fetchFilmAction.fulfilled.type, payload: mockFilm }))
      .toEqual({ ...initialState, activeFilm: { film: mockAdaptedFilm, reviews: null, similarFilms: null } });
  });

  it('should set FILM to null by load film with null payload', () => {
    expect(filmData.reducer(someNewState, { type: fetchFilmAction.fulfilled.type, payload: null }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, film: null } });
  });

  it('should reset ACTIVE FILM data by load film pending', () => {
    expect(filmData.reducer(someNewState, { type: fetchFilmAction.pending.type }))
      .toEqual({ ...someNewState, activeFilm: { film: null, reviews: null, similarFilms: null } });
  });

  it('should reset ACTIVE FILM data by load film rejected', () => {
    expect(filmData.reducer(someNewState, { type: fetchFilmAction.rejected.type }))
      .toEqual({ ...someNewState, activeFilm: { film: null, reviews: null, similarFilms: null } });
  });

  it('should update REVIEWS by load reviews', () => {
    expect(filmData.reducer(initialState, { type: fetchReviewsAction.fulfilled.type, payload: mockReviews }))
      .toEqual({ ...initialState, activeFilm: { film: null, reviews: mockAdaptedReviews, similarFilms: null } });
  });

  it('should set empty REVIEWS by load reviews with null payload', () => {
    expect(filmData.reducer(someNewState, { type: fetchReviewsAction.fulfilled.type, payload: null }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, reviews: [] } });
  });

  it('should reset REVIEWS by load reviews pending', () => {
    expect(filmData.reducer(someNewState, { type: fetchReviewsAction.pending.type }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, reviews: null } });
  });

  it('should reset REVIEWS by load reviews rejected', () => {
    expect(filmData.reducer(someNewState, { type: fetchReviewsAction.rejected.type }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, reviews: null } });
  });

  it('should update SIMILAR FILMS by load similar films', () => {
    expect(filmData.reducer(initialState, { type: fetchSimilarFilmAction.fulfilled.type, payload: mockFilms }))
      .toEqual({...initialState, activeFilm: { film: null, reviews: null, similarFilms: mockAdaptedFilms.slice(0, CatalogCount.Similar) } });
  });

  it('should set empty SIMILAR FILMS by load similar films with null payload', () => {
    expect(filmData.reducer(someNewState, { type: fetchSimilarFilmAction.fulfilled.type, payload: null }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, similarFilms: [] } });
  });

  it('should reset SIMILAR FILMS by load similar films pending', () => {
    expect(filmData.reducer(someNewState, { type: fetchSimilarFilmAction.pending.type }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, similarFilms: null } });
  });

  it('should reset SIMILAR FILMS by load similar films rejected', () => {
    expect(filmData.reducer(someNewState, { type: fetchSimilarFilmAction.rejected.type }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, similarFilms: null } });
  });

  it('should update TO WATCH FILMS by load to watch films', () => {
    expect(filmData.reducer(initialState, { type: fetchToWatchFilms.fulfilled.type, payload: mockFilms }))
      .toEqual({ ...initialState, myList: mockAdaptedFilms });
  });

  it('should set empty TO WATCH FILMS by load to watch films with null payload', () => {
    expect(filmData.reducer(someNewState, { type: fetchToWatchFilms.fulfilled.type, payload: null }))
      .toEqual({ ...someNewState, myList: [] });
  });

  it('should update active film and promo film by add to watch film when payload id matches promoFilm id', () => {
    const updatedMockFilm = { ...mockFilm, isFavorite: !mockFilm.isFavorite };
    const updatedMockAdaptedFilm = adaptFilmToApp(updatedMockFilm);

    initialState.promoFilm = mockAdaptedFilm;

    expect(filmData.reducer(initialState, { type: fetchAddToWatchAction.fulfilled.type, payload: updatedMockFilm }))
      .toEqual({ ...initialState, activeFilm: { ...initialState.activeFilm, film: updatedMockAdaptedFilm }, promoFilm: updatedMockAdaptedFilm });
  });

  it('should update active film and keep promo film unchanged by add to watch film when payload id does not match promoFilm id', () => {
    const updatedMockFilm = { ...mockFilm, id: mockFilm.id + 1 };
    const updatedMockAdaptedFilm = adaptFilmToApp(updatedMockFilm);

    expect(filmData.reducer(someNewState, { type: fetchAddToWatchAction.fulfilled.type, payload: updatedMockFilm }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, film: updatedMockAdaptedFilm }, promoFilm: mockAdaptedFilm });
  });

  it('should set active film to null and keep promo film by add to watch film with null payload', () => {
    expect(filmData.reducer(someNewState, { type: fetchAddToWatchAction.fulfilled.type, payload: null }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, film: null }, promoFilm: mockAdaptedFilm });
  });

  it('should reset REVIEWS by load new review pending', () => {
    expect(filmData.reducer(someNewState, { type: fetchNewReviewAction.pending.type }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, reviews: null } });
  });

  it('should update REVIEWS by load new review', () => {
    expect(filmData.reducer(initialState, { type: fetchNewReviewAction.fulfilled.type, payload: mockReviews }))
      .toEqual({ ...initialState, activeFilm: { ...initialState.activeFilm, reviews: mockAdaptedReviews } });
  });

  it('should set empty REVIEWS by load new review with null payload', () => {
    expect(filmData.reducer(someNewState, { type: fetchNewReviewAction.fulfilled.type, payload: null }))
      .toEqual({ ...someNewState, activeFilm: { ...someNewState.activeFilm, reviews: [] } });
  });
});