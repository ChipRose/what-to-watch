
import { store } from '../store';

import { AuthorizationStatus } from '../const/const';

import type { GenreNameType, FilmsType, FilmType, GroupedFilmsType } from './film';
import type { ReviewsType } from './review';

export type StoreType = {
  error: string | null;
  isFilmsLoaded: boolean;
  films: FilmsType|null;
  promoFilm: FilmType | null;
  defaultFilmsList: FilmsType | null;
  myList: FilmsType | null;
  authorizationStatus: AuthorizationStatus;
  userInfo: {
    avatar: string | null;
  };
  catalog: {
    count: number | null;
    activeGenre: GenreNameType;
    films: FilmsType|null;
    isAllShown: boolean;
  };
  groupedFilms: GroupedFilmsType | null;
  activeFilm: {
    film: FilmType | null;
    reviews: ReviewsType|null;
    similarFilms: FilmsType|null;
  };
};

export type FilmDataType={
  error: string | null;
  isFilmsLoaded: boolean;
  films: FilmsType | null;
  myList: FilmsType | null;
  promoFilm: FilmType | null;
  catalog: {
    count: number | null;
    activeGenre: GenreNameType;
    films: FilmsType|null;
    isAllShown: boolean;
  };
  defaultFilmsList: FilmsType | null;
  groupedFilms: GroupedFilmsType | null;
  activeFilm: {
    film: FilmType | null;
    reviews: ReviewsType| null;
    similarFilms: FilmsType|null;
  };
}

export type UserProcessType = {
  authorizationStatus: AuthorizationStatus;
  userInfo: {
    avatar: string | null;
  };
};

export type FilmProcessType = {
  myList: FilmsType | null;
}

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
