import { createAction } from '@reduxjs/toolkit';

import { AuthorizationStatus, Action, AppRoute } from '../const/const';
import type { UserInfoType } from '../services/user-profile';

import type { FilmsType, GenreNameType } from '../types/film';
import type { ReviewsType } from '../types/review';
import { ServerFilmType, ServerFilmsType, ServerReviewsType } from '../types/server-data';

export const loadFilms = createAction<ServerFilmsType>(Action.LOAD_FILMS);
export const loadPromoFilm = createAction<ServerFilmType>(Action.LOAD_PROMO_FILM);
export const loadReviews = createAction<ServerReviewsType>(Action.LOAD_REVIEWS);
export const setFilmsLoadedStatus = createAction<boolean>(Action.SET_FILMS_LOADED_STATUS);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);
export const setGenre = createAction<GenreNameType>(Action.SET_GENRE);
export const setFilms = createAction<FilmsType>(Action.SET_FILMS);
export const setReviews = createAction<ReviewsType>(Action.SET_REVIEWS);
export const setCatalog = createAction<number>(Action.SET_CATALOG);
export const loadMoreToCatalog = createAction(Action.LOAD_MORE_FILMS);
export const setActiveFilm = createAction<number>(Action.SET_ACTIVE_FILM);
export const resetCatalog = createAction(Action.RESET_CATALOG);
export const resetApp = createAction(Action.RESET_APP);
export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
export const setUserData = createAction<UserInfoType | null>(Action.SET_USER_DATA);
