import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../services/api';
import { redirect } from './middlewares/redirect/redirect';
import { syncCatalog } from './middlewares/sync-catalog/sync-catalog';
import { syncFilmInfo } from './middlewares/sync-film-info/sync-film-info';

import { rootReducer } from './reducers/root-reducer';

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).prepend(syncFilmInfo.middleware, syncCatalog.middleware).concat(redirect),
});
