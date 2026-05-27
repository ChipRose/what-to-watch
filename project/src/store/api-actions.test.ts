import type { AnyAction } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createApi } from '../services/api';
import {
  checkAuthAction,
  fetchAddToWatchAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchNewReviewAction,
  fetchPromoFilmAction,
  fetchReviewsAction,
  fetchSimilarFilmAction,
  fetchToWatchFilms,
} from './api-actions';
import { APIRoute, AppRoute } from '../const/const';
import { redirectToRoute } from './actions';
import { makeReview, makeReviews, makeTestFilm } from '../util/mocks';

import type { StateType } from '../types/state';

describe('Async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    StateType,
    AnyAction,
    ThunkDispatch<StateType, typeof api, AnyAction>
  >(middlewares);

  afterEach(() => {
    mockAPI.resetHandlers();
  });

  describe('AUTH API', () => {
    it('should authorization status is «auth» when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`/${APIRoute.Login}`)
        .reply(200, []);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch rejected when server return 401', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`/${APIRoute.Login}`)
        .reply(401, []);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });

    it('should dispatch rejected when server return 500', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`/${APIRoute.Login}`)
        .reply(500, []);

      await store.dispatch(checkAuthAction());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('FILMS API', () => {
    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`/${APIRoute.Films}`)
        .reply(200, []);

      await store.dispatch(fetchFilmsAction());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);
    });

    it('should dispatch pending and fulfilled when server return 500 (handled inside thunk)', async () => {
      const store = mockStore();
      mockAPI
        .onGet(`/${APIRoute.Films}`)
        .reply(500, []);

      await store.dispatch(fetchFilmsAction());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchFilmsAction.pending.type,
        fetchFilmsAction.fulfilled.type,
      ]);
    });
  });

  describe('FILM API', () => {
    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();
      const film = makeTestFilm();

      mockAPI
        .onGet(/\/films\/+1$/)
        .reply(200, film);

      await store.dispatch(fetchFilmAction(1));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        fetchFilmAction.fulfilled.type,
      ]);
    });

    it('should redirect to NotFound and dispatch rejected when server return 404', async () => {
      const store = mockStore();

      mockAPI
        .onGet(/\/films\/+1$/)
        .reply(404, []);

      await store.dispatch(fetchFilmAction(1));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchFilmAction.pending.type,
        redirectToRoute.type,
        fetchFilmAction.rejected.type,
      ]);

      expect(store.getActions()[1]).toEqual(redirectToRoute(AppRoute.NotFound));
    });
  });

  describe('SIMILAR FILMS API', () => {
    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`/${APIRoute.Films}/1/similar`)
        .reply(200, []);

      await store.dispatch(fetchSimilarFilmAction(1));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchSimilarFilmAction.pending.type,
        fetchSimilarFilmAction.fulfilled.type,
      ]);
    });

    it('should dispatch pending and fulfilled when server return 500 (handled inside thunk)', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`/${APIRoute.Films}/1/similar`)
        .reply(500, []);

      await store.dispatch(fetchSimilarFilmAction(1));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchSimilarFilmAction.pending.type,
        fetchSimilarFilmAction.fulfilled.type,
      ]);
    });
  });

  describe('REVIEWS API', () => {
    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`/${APIRoute.Comments}/1`)
        .reply(200, []);

      await store.dispatch(fetchReviewsAction(1));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
    });

    it('should dispatch pending and fulfilled when server return 500 (handled inside thunk)', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`/${APIRoute.Comments}/1`)
        .reply(500, []);

      await store.dispatch(fetchReviewsAction(1));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);
    });
  });

  describe('PROMO API', () => {
    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();
      const film = makeTestFilm();

      mockAPI
        .onGet(`/${APIRoute.Promo}`)
        .reply(200, film);

      await store.dispatch(fetchPromoFilmAction());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchPromoFilmAction.pending.type,
        fetchPromoFilmAction.fulfilled.type,
      ]);
    });
  });

  describe('NEW REVIEW API', () => {
    const reviewPayload = makeReview();

    it('should dispatch pending, redirect and fulfilled when server return 200', async () => {
      const store = mockStore();
      const reviews = makeReviews();

      mockAPI
        .onPost(`/${APIRoute.Comments}/${reviewPayload.id}`)
        .reply(200, reviews);

      await store.dispatch(fetchNewReviewAction(reviewPayload));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchNewReviewAction.pending.type,
        redirectToRoute.type,
        fetchNewReviewAction.fulfilled.type,
      ]);

      expect(store.getActions()[1]).toEqual(redirectToRoute(`${AppRoute.Films}/${reviewPayload.id}`));
    });

    it('should redirect and dispatch fulfilled when id is missing', async () => {
      const store = mockStore();

      await store.dispatch(fetchNewReviewAction({ id: 0, comment: 'test', rating: 5 }));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchNewReviewAction.pending.type,
        redirectToRoute.type,
        fetchNewReviewAction.fulfilled.type,
      ]);

      expect(store.getActions()[1]).toEqual(redirectToRoute(`${AppRoute.Films}/0`));
    });

    it('should redirect and dispatch fulfilled when server return 400 (handled inside thunk)', async () => {
      const store = mockStore();

      mockAPI
        .onPost(`/${APIRoute.Comments}/${reviewPayload.id}`)
        .reply(400, []);

      await store.dispatch(fetchNewReviewAction(reviewPayload));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchNewReviewAction.pending.type,
        redirectToRoute.type,
        fetchNewReviewAction.fulfilled.type,
      ]);

      expect(store.getActions()[1]).toEqual(redirectToRoute(`${AppRoute.Films}/${reviewPayload.id}`));
    });

    it('should dispatch pending and fulfilled when server return 500 (handled inside thunk)', async () => {
      const store = mockStore();

      mockAPI
        .onPost(`/${APIRoute.Comments}/1`)
        .reply(500, []);

      await store.dispatch(fetchNewReviewAction(reviewPayload));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchNewReviewAction.pending.type,
        fetchNewReviewAction.fulfilled.type,
      ]);
    });
  });

  describe('ADD TO WATCH API', () => {
    const testFilm = makeTestFilm();
    const testFavoriteFilm = { ...testFilm, isFavorite: true };
    const testUnfavoriteFilm = { ...testFilm, isFavorite: false };
    const favoriteStatus = 1;
    const unfavoriteStatus = 0;

    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();

      mockAPI
        .onPost(`/${APIRoute.Favorite}/${testFilm.id}/${favoriteStatus}`)
        .reply(200, testFavoriteFilm);

      await store.dispatch(fetchAddToWatchAction({ id: testFilm.id, status: favoriteStatus }));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchAddToWatchAction.pending.type,
        fetchAddToWatchAction.fulfilled.type,
      ]);

      expect(store.getActions()[1].payload).toEqual(testFavoriteFilm);
    });

    it('should dispatch pending and fulfilled when removing from favorites', async () => {
      const store = mockStore();

      mockAPI
        .onPost(`/${APIRoute.Favorite}/${testFavoriteFilm.id}/${unfavoriteStatus}`)
        .reply(200, testUnfavoriteFilm);

      await store.dispatch(fetchAddToWatchAction({ id: testFavoriteFilm.id, status: unfavoriteStatus }));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchAddToWatchAction.pending.type,
        fetchAddToWatchAction.fulfilled.type,
      ]);

      expect(store.getActions()[1].payload).toEqual(testUnfavoriteFilm);
    });

    it('should dispatch pending and fulfilled with null payload when id is missing', async () => {
      const store = mockStore();

      await store.dispatch(fetchAddToWatchAction({ id: 0, status: favoriteStatus }));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchAddToWatchAction.pending.type,
        fetchAddToWatchAction.fulfilled.type,
      ]);

      expect(store.getActions()[1].payload).toBeNull();
    });

    it('should dispatch pending and rejected when server return 500', async () => {
      const store = mockStore();

      mockAPI
        .onPost(`/${APIRoute.Favorite}/${testFilm.id}/${favoriteStatus}`)
        .reply(500, []);

      await store.dispatch(fetchAddToWatchAction({ id: testFilm.id, status: favoriteStatus }));

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchAddToWatchAction.pending.type,
        fetchAddToWatchAction.rejected.type,
      ]);
    });
  });

  describe('TO WATCH API', () => {
    it('should dispatch pending and fulfilled when server return 200', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`/${APIRoute.Favorite}`)
        .reply(200, []);

      await store.dispatch(fetchToWatchFilms());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchToWatchFilms.pending.type,
        fetchToWatchFilms.fulfilled.type,
      ]);
    });

    it('should dispatch pending and rejected when server return 500', async () => {
      const store = mockStore();

      mockAPI
        .onGet(`/${APIRoute.Favorite}`)
        .reply(500, []);

      await store.dispatch(fetchToWatchFilms());

      const actions = store.getActions().map((action: { type: string }) => action.type);

      expect(actions).toEqual([
        fetchToWatchFilms.pending.type,
        fetchToWatchFilms.rejected.type,
      ]);
    });
  });
});
