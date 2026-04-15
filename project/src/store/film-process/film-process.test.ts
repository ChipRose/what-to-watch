import { filmProcess } from './film-process';

import { Genre, CatalogCount } from '../../const/const';
import { makeTestFilms } from '../../util/mocks';
import { adaptFilmsDataToApp } from '../../util/util-adapt-data';

import type { FilmProcessType } from '../../types/state';
import type { FilmsType } from '../../types/film';

const mockFilms = makeTestFilms();
const mockAdaptedFilms: FilmsType = adaptFilmsDataToApp(mockFilms) ?? [];

describe('Reducer: filmProcess', () => {
  let initialState: FilmProcessType;

  beforeEach(() => {
    initialState = {
      catalog: {
        films: null,
        activeGenre: Genre.All,
        count: CatalogCount.Init,
        isAllShown: false,
      }
    };
  });

  it('should return initial state when passed an empty action', () => {
    expect(filmProcess.reducer(undefined, { type: '' }))
      .toEqual(initialState);
  });

  it('should update CATALOG DATA by set catalog data', () => {
    expect(filmProcess.reducer(initialState, {
      type: filmProcess.actions.setCatalogData.type,
      payload: {
        activeGenre: Genre.Crime,
        count: CatalogCount.Init * 2,
        films: mockAdaptedFilms.slice(0, CatalogCount.Init),
        isAllShown: true,
      }
    }))
      .toEqual({
        catalog: {
          activeGenre: Genre.Crime,
          count: CatalogCount.Init * 2,
          films: mockAdaptedFilms.slice(0, CatalogCount.Init),
          isAllShown: true,
        }
      });
  });

  it('should update only provided catalog fields by setCatalogData', () => {
    const state: FilmProcessType = {
      catalog: {
        films: mockAdaptedFilms.slice(0, CatalogCount.Init),
        activeGenre: Genre.Drama,
        count: CatalogCount.Init,
        isAllShown: false,
      }
    };

    expect(filmProcess.reducer(state, {
      type: filmProcess.actions.setCatalogData.type,
      payload: { activeGenre: Genre.Comedy }
    }))
      .toEqual({
        catalog: {
          films: mockAdaptedFilms.slice(0, CatalogCount.Init),
          activeGenre: Genre.Comedy,
          count: CatalogCount.Init,
          isAllShown: false,
        }
      });
  });

  it('should update CATALOG FILMS and COUNT by load more to catalog when enough films remain', () => {
    const state: FilmProcessType = {
      catalog: {
        films: mockAdaptedFilms.slice(0, CatalogCount.Init),
        activeGenre: Genre.All,
        count: CatalogCount.Init,
        isAllShown: false,
      }
    };

    expect(filmProcess.reducer(state, {
      type: filmProcess.actions.loadMoreToCatalog.type,
      payload: mockAdaptedFilms
    }))
      .toEqual({
        catalog: {
          films: mockAdaptedFilms.slice(0, CatalogCount.Init * 2),
          activeGenre: Genre.All,
          count: CatalogCount.Init * 2,
          isAllShown: false,
        }
      });
  });

  it('should update CATALOG FILMS and COUNT by load more to catalog when few films remain', () => {
    const state: FilmProcessType = {
      catalog: {
        films: mockAdaptedFilms.slice(0, CatalogCount.Init * 2),
        activeGenre: Genre.All,
        count: CatalogCount.Init * 2,
        isAllShown: false,
      }
    };

    expect(filmProcess.reducer(state, {
      type: filmProcess.actions.loadMoreToCatalog.type,
      payload: mockAdaptedFilms
    }))
      .toEqual({
        catalog: {
          films: mockAdaptedFilms,
          activeGenre: Genre.All,
          count: mockAdaptedFilms.length,
          isAllShown: true,
        }
      });
  });

});