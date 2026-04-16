import { createAction } from '@reduxjs/toolkit';
import { Action, AppRoute } from '../const/const';
import type { FilmIdType } from '../types/film';

export const redirectToRoute = createAction<AppRoute | string>(Action.REDIRECT_TO_ROUTE);
export const loadFilmInfoAction = createAction<FilmIdType>(Action.LOAD_FILM);
