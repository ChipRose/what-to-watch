import { createListenerMiddleware } from '@reduxjs/toolkit';

import {
  fetchReviewsAction,
  fetchFilmAction,
  fetchSimilarFilmAction
} from '../../api-actions';
import { loadFilmInfoAction } from '../../actions';
import { redirectToRoute } from '../../actions';
import { AppRoute } from '../../../const/const';
import type { AppDispatchType } from '../../../types/state';

export const syncFilmInfo = createListenerMiddleware();

syncFilmInfo.startListening({
  actionCreator: loadFilmInfoAction,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch as AppDispatchType;
    const id = action.payload;
    if (!id || Number.isNaN(id)) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return;
    }

    try {
      await dispatch(fetchFilmAction(action.payload)).unwrap();
    } catch (_error) {
      dispatch(redirectToRoute(AppRoute.NotFound));
      return;
    }

    try {
      await dispatch(fetchReviewsAction(action.payload)).unwrap();
      await dispatch(fetchSimilarFilmAction(action.payload)).unwrap();
    } catch (_error) {
      // Ошибки запросов отзывов/похожих фильмов не должны ронять страницу фильма.
    }
  },
});
