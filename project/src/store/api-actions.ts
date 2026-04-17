import { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

import type { AppDispatchType } from '../types/state';
import type { UserDataType } from '../types/user-data';
import type { AuthDataType } from '../types/auth-data';
import type { FilmsType, FilmIdType } from '../types/film';
import type { NewReviewType } from '../components/add-review-form/add-review-form';

import { Action, APIRoute, AppRoute } from '../const/const';

import { redirectToRoute } from './actions';
import { saveUserProfile, dropUserProfile } from '../services/user-profile';
import { adaptFilmsDataToApp } from '../util/util-adapt-data';
import { ServerFilmType, ServerFilmsType, ServerReviewsType } from '../types/server-data';

export const fetchFilmsAction = createAsyncThunk<FilmsType, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_FILMS,
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<ServerFilmsType>(APIRoute.Films);
      return adaptFilmsDataToApp(data) ?? [];
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText ?? 'Failed to load films');
      return [];
    }
  }
);

export const fetchFilmAction = createAsyncThunk<ServerFilmType, FilmIdType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_FILM,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ServerFilmType>(`${APIRoute.Films}/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
      throw error;
    }
  },
);

export const fetchSimilarFilmAction = createAsyncThunk<ServerFilmsType, FilmIdType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.LOAD_SIMILAR_FILMS,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<ServerFilmsType>(`${APIRoute.Films}/${id}/similar`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText ?? 'Failed to load similar films');
      return [];
    }
  },
);

export const fetchPromoFilmAction = createAsyncThunk<ServerFilmType, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_PROMO_FILM,
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ServerFilmType>(APIRoute.Promo);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<ServerReviewsType, FilmIdType, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_REVIEWS,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<ServerReviewsType>(`${APIRoute.Comments}/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.response?.statusText ?? 'Failed to load reviews');
      return [];
    }
  }
);

export const fetchNewReviewAction = createAsyncThunk<ServerReviewsType, NewReviewType & { id: FilmIdType }, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_NEW_REVIEW,
  async ({ id, comment, rating }, { dispatch, extra: api }) => {
    if (!id) {
      dispatch(redirectToRoute(`${AppRoute.Films}/${id}`));
      return [];
    }

    try {
      const { data } = await api.post<ServerReviewsType>(`${APIRoute.Comments}/${id}`, {
        comment, rating
      });
      dispatch(redirectToRoute(`${AppRoute.Films}/${id}`));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === StatusCodes.BAD_REQUEST) {
        dispatch(redirectToRoute(`${AppRoute.Films}/${id}`));
        return [];
      }
      return [];
    }
  },
);

export const fetchAddToWatchAction = createAsyncThunk<ServerFilmType | null, { id: FilmIdType; status: 1 | 0 }, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_ADD_TO_WATCH,
  async ({ id, status }, { dispatch, extra: api }) => {
    if (!id) {
      return null;
    }

    const { data } = await api.post<ServerFilmType>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  },
);

export const fetchToWatchFilms = createAsyncThunk<ServerFilmsType, undefined, {
  dispatch: AppDispatchType;
  extra: AxiosInstance;
}>(
  Action.FETCH_TO_WATCH,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<ServerFilmsType>(APIRoute.Favorite);
    return data;
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
