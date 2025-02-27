
import { store } from '../store';

import { AuthorizationStatus } from '../const/const';

import type { GenreNameType, FilmsType, FilmType, GroupedFilmsType } from './film';
import type { ReviewsType } from './review';

export type StoreType = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isFilmsLoaded: boolean;
  activeGenre: GenreNameType;
  films: FilmsType;
  defaultFilmsList: FilmsType|null;
  groupedFilms: GroupedFilmsType | null;
  reviews: ReviewsType;
  catalog: {
    count: number | null;
    films: FilmsType;
    isAllShown: boolean;
  };
  activeFilm: {
    film: FilmType | null;
    reviews: ReviewsType;
  };
  userInfo:{
    avatar: string;
  };
};

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
