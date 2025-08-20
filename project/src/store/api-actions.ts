import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';

import type { AppDispatchType } from '../types/state';
import type { UserDataType } from '../types/user-data';
import type { AuthDataType } from '../types/auth-data';
import type { FilmIdType } from '../types/film';
import type { NewReviewType } from '../components/add-review-form/add-review-form';

import { Action, APIRoute, AppRoute} from '../const/const';

import { loadToWatchFilms, loadActiveFilm, loadSimilarFilms, loadFilm, loadReviews, redirectToRoute } from './actions';
import { saveUserProfile, dropUserProfile } from '../services/user-profile';
import { ServerFilmType, ServerFilmsType, ServerReviewsType } from '../types/server-data';

export const fetchFilmsAction = createAsyncThunk<ServerFilmsType, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_FILMS,
  async (_arg, {dispatch, extra: api }) => {
    const { data } = await api.get<ServerFilmsType>(APIRoute.Films);
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<void, FilmIdType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_FILM,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ServerFilmType>(`${APIRoute.Films}/${id}`);
      dispatch(loadFilm(data));
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      } else {
        throw error;
      }
    }
  },
);

export const fetchSimilarFilmAction = createAsyncThunk<void, FilmIdType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.LOAD_SIMILAR_FILMS,
  async (id, { dispatch, extra: api }) => {
    const { data } = await api.get<ServerFilmsType>(`${APIRoute.Films}/${id}/similar`);
    dispatch(loadSimilarFilms(data));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<ServerFilmType, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_PROMO_FILM,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ServerFilmType>(APIRoute.Promo);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<void, FilmIdType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_REVIEWS,
  async (id, { dispatch, extra: api }) => {

    if (id) {
      const { data } = await api.get<ServerReviewsType>(`${APIRoute.Comments}${id}`);
      dispatch(loadReviews(data));
    }
  },
);

export const fetchNewReviewAction = createAsyncThunk<void, NewReviewType & { id: FilmIdType }, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_REVIEWS,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {

    if (id) {
      const { data } = await api.post<ServerReviewsType>(`${APIRoute.Comments}${id}`, {
        comment, rating
      });
      dispatch(loadReviews(data));
    }
  },
);

export const fetchAddToWatchAction = createAsyncThunk<void, { id: FilmIdType; status: 1 | 0 }, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_ADD_TO_WATCH,
  async ({ id, status }, { dispatch, extra: api }) => {
    if (id) {
      const { data } = await api.post<ServerFilmType>(`${APIRoute.Favorite}${id}/${status}`);
      dispatch(loadActiveFilm(data));
    }
  },
);

export const fetchToWhatchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_TO_WATCH,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ServerFilmsType>(APIRoute.Favorite);
    dispatch(loadToWatchFilms(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.CHECK_USER_AUTH,
  async (_arg, { dispatch, extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<void, AuthDataType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.LOGIN_USER,
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data } = await api.post<UserDataType>(APIRoute.Login, { email, password });
    saveUserProfile(data);
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.LOGOUT_USER,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropUserProfile();
  },
);
