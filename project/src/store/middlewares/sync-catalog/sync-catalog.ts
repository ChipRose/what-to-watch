import { createListenerMiddleware } from '@reduxjs/toolkit';

import { Genre, CatalogCount } from '../../../const/const';
import { getCatalogData } from '../../../util/util';
import { fetchFilmsAction } from '../../api-actions';
import { setCatalogData } from '../../film-process/film-process';

export const syncCatalog = createListenerMiddleware();

syncCatalog.startListening({
  actionCreator: fetchFilmsAction.pending,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(setCatalogData({
      films: null,
      count: 0,
      isAllShown: false,
    }));
  },
});

syncCatalog.startListening({
  actionCreator: fetchFilmsAction.fulfilled,
  effect: (action, listenerApi) => {
    const catalogData = getCatalogData(action.payload, Genre.All, CatalogCount.Init);
    listenerApi.dispatch(setCatalogData({
      ...catalogData,
      activeGenre: Genre.All,
    }));
  },
});

syncCatalog.startListening({
  actionCreator: fetchFilmsAction.rejected,
  effect: (_action, listenerApi) => {
    listenerApi.dispatch(setCatalogData({
      films: null,
      count: 0,
      isAllShown: false,
    }));
  },
});
