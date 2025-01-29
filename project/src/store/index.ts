import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import { createApi } from '../services/api';

const api = createApi();

export const store = configureStore({
  reducer,
  middleware: (getDefualtMiddleware) => getDefualtMiddleware({
    thunk: {
      extraArgument: api,
    },
  }),
});
