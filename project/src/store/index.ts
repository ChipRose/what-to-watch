import { configureStore } from '@reduxjs/toolkit';

import { createApi } from '../services/api';
import { reducer } from './reducer';
import { redirect } from './middlewares/redirect';

const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefualtMiddleware) => getDefualtMiddleware({
    thunk: {
      extraArgument: api,
    },
  }).concat(redirect),
});
