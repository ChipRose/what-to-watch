import { AnyAction, Middleware, configureStore } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';

import { createApi } from '../../../services/api';
import { APIRoute, AppRoute, NameSpace } from '../../../const/const';
import { makeTestFilm, makeTestFilms, makeReviews } from '../../../util/mocks';
import { fetchFilmAction, fetchReviewsAction, fetchSimilarFilmAction } from '../../api-actions';
import { loadFilmInfoAction, redirectToRoute } from '../../actions';
import { syncFilmInfo } from './sync-film-info';

const api = createApi();
const mockAPI = new MockAdapter(api);

const createTestStore = () => {
  const actions: AnyAction[] = [];
  const observerMiddleware: Middleware = () => (next) => (action) => {
    actions.push(action as AnyAction);
    return next(action);
  };

  const store = configureStore({
    reducer: () => ({
      [NameSpace.Data]: {},
      [NameSpace.User]: {},
      [NameSpace.Film]: {},
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: { extraArgument: api },
    }).prepend(syncFilmInfo.middleware).concat(observerMiddleware),
  });

  return { store, actions };
};

describe('Middleware: syncFilmInfo', () => {
  afterEach(() => {
    mockAPI.reset();
  });

  it('should redirect to not-found for invalid film id', async () => {
    const { store, actions } = createTestStore();

    store.dispatch(loadFilmInfoAction(0));
    await Promise.resolve();

    expect(actions).toContainEqual(redirectToRoute(AppRoute.NotFound));
  });

  it('should redirect to not-found when film request fails', async () => {
    const { store, actions } = createTestStore();
    const filmId = 1;

    mockAPI.onGet(`${APIRoute.Films}/${filmId}`).reply(404);

    store.dispatch(loadFilmInfoAction(filmId));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actions).toContainEqual(redirectToRoute(AppRoute.NotFound));
    expect(actions.find((action) => action.type === fetchReviewsAction.pending.type)).toBeUndefined();
  });

  it('should load film info, reviews and similar films on success', async () => {
    const { store, actions } = createTestStore();
    const filmId = 1;

    mockAPI.onGet(`${APIRoute.Films}/${filmId}`).reply(200, makeTestFilm());
    mockAPI.onGet(`${APIRoute.Comments}/${filmId}`).reply(200, makeReviews());
    mockAPI.onGet(`${APIRoute.Films}/${filmId}/similar`).reply(200, makeTestFilms());

    store.dispatch(loadFilmInfoAction(filmId));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(actions.find((action) => action.type === fetchFilmAction.fulfilled.type)).toBeDefined();
    expect(actions.find((action) => action.type === fetchReviewsAction.fulfilled.type)).toBeDefined();
    expect(actions.find((action) => action.type === fetchSimilarFilmAction.fulfilled.type)).toBeDefined();
    expect(actions).not.toContainEqual(redirectToRoute(AppRoute.NotFound));
  });
});
