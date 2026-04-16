import { createListenerMiddleware } from '@reduxjs/toolkit';

import {
  fetchReviewsAction,
  fetchFilmAction,
  fetchSimilarFilmAction
} from '../../api-actions';
import { loadFilmInfoAction } from '../../actions';
import type { AppDispatchType } from '../../../types/state';

export const syncFilmInfo = createListenerMiddleware();

syncFilmInfo.startListening({
  actionCreator: loadFilmInfoAction,
  effect: async (action, listenerApi) => {
    const dispatch = listenerApi.dispatch as AppDispatchType;

    try {
      await dispatch(fetchFilmAction(action.payload)).unwrap();
      await dispatch(fetchReviewsAction(action.payload)).unwrap();
      await dispatch(fetchSimilarFilmAction(action.payload)).unwrap();
    } catch (_error) {
      // Ошибки обрабатываются в соответствующих thunk/reducer ветках.
    }
  },
});
