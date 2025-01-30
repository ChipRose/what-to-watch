
import { store } from '../store';

import { AuthorizationStatus } from '../const/const';

import type { GenreNameType, FilmsType, FilmType, GroupedFilmsType } from './film';
import type { ReviewsType } from './review';

export type GenreStateType = {
  authorizationStatus: AuthorizationStatus;
  activeGenre: GenreNameType;
  films: FilmsType;
  groupedFilms: GroupedFilmsType;
  reviews: ReviewsType;
  catalog: {
    count: number | null;
    films: FilmsType;
    isAllShown: boolean;
  };
  activeFilm: {
    film: FilmType;
    reviews: ReviewsType;
  };
};

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
