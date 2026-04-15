import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../services/api';
import { redirect } from './middlewares/redirect';
import { syncCatalog } from './middlewares/sync-catalog';

import { rootReducer } from './root-reducer';

const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).prepend(syncCatalog.middleware).concat(redirect),
});
