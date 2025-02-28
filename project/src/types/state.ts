
import { store } from '../store';

import { AuthorizationStatus } from '../const/const';

import type { GenreNameType, FilmsType, FilmType, GroupedFilmsType } from './film';
import type { ReviewsType } from './review';

export type StoreType = {
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isFilmsLoaded: boolean;
  films: FilmsType;
  defaultFilmsList: FilmsType | null;
  groupedFilms: GroupedFilmsType | null;
  catalog: {
    count: number | null;
    activeGenre: GenreNameType;
    films: FilmsType;
    isAllShown: boolean;
  };
  activeFilm: {
    film: FilmType | null;
    reviews: ReviewsType;
    similarFilms: FilmsType;
  };
  promoFilm: FilmType | null;
  userInfo: {
    avatar: string;
  };
};

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
