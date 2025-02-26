import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import type { AppDispatchType, StateType } from '../types/state';
import type { ReviewsType } from '../types/review';
import type { UserDataType } from '../types/user-data';
import type { AuthDataType } from '../types/auth-data';

import { Action, APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const/const';

import { loadFilms, loadReviews, requireAuthorization, setError, setFilmsLoadedStatus, redirectToRoute } from './actions';
import { saveToken, dropToken } from '../services/token';
import { store } from '.';
import { ServerFilmsType } from '../types/server-data';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  Action.FETCH_FILMS,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ServerFilmsType>(APIRoute.Films);
    dispatch(setFilmsLoadedStatus(true));
    dispatch(loadFilms(data));
    dispatch(setFilmsLoadedStatus(false));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  Action.FETCH_REVIEWS,
  async (_arg, { dispatch, getState, extra: api }) => {
    const state = getState();
    const id = state.activeFilm?.film?.id;

    if (id) {
      const { data } = await api.get<ReviewsType>(`${APIRoute.Comments}${id}`);
      dispatch(loadReviews(data));
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  Action.CHECK_USER_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  Action.LOGIN_USER,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserDataType>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  state: StateType;
  extra: AxiosInstance;
}>(
  Action.LOGOUT_USER,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const resetErrorAction = createAsyncThunk(
  Action.RESET_ERROR,
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR
    );
  }
);
