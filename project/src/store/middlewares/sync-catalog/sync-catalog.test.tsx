import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { createApi } from '../../../services/api';
import { CatalogCount, Genre, NameSpace } from '../../../const/const';
import { getCatalogData } from '../../../util/util';
import { makeTestFilms } from '../../../util/mocks';
import { adaptFilmsDataToApp } from '../../../util/util-adapt-data';

import { syncCatalog } from './sync-catalog';
import { fetchFilmsAction } from '../../api-actions';
import { setCatalogData } from '../../reducers/film-process/film-process';

import type { StateType } from '../../../types/state';

const api = createApi();

const middlewares = [syncCatalog.middleware];

const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);

const makeStore = () => mockStore({
  [NameSpace.Film]: {
    catalog: {
      films: null,
      activeGenre: Genre.All,
      count: CatalogCount.Init,
      isAllShown: false,
    }
  }
});

describe('Middleware: syncCatalog', () => {
  it('should set catalog data to initial state when fetchFilmsAction.pending is dispatched', () => {
    const store = makeStore();
    store.dispatch(fetchFilmsAction.pending('request-id', undefined));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchFilmsAction.pending.type);
    expect(actions[1]).toEqual(setCatalogData({
      films: null,
      count: 0,
      isAllShown: false,
    }));
  });

  it('should set catalog data from fulfilled payload', () => {
    const store = makeStore();
    const mockAdaptedFilms = adaptFilmsDataToApp(makeTestFilms()) ?? [];
    const expectedCatalog = getCatalogData(mockAdaptedFilms, Genre.All, CatalogCount.Init);

    store.dispatch(fetchFilmsAction.fulfilled(mockAdaptedFilms, 'request-id', undefined));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchFilmsAction.fulfilled.type);
    expect(actions[1]).toEqual(setCatalogData({
      ...expectedCatalog,
      activeGenre: Genre.All,
    }));
  });

  it('should set catalog data to initial state when fetchFilmsAction.rejected is dispatched', () => {
    const store = makeStore();
    store.dispatch(fetchFilmsAction.rejected(new Error('error'), 'request-id', undefined));

    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchFilmsAction.rejected.type);
    expect(actions[1]).toEqual(setCatalogData({
      films: null,
      count: 0,
      isAllShown: false,
    }));
  });
});
