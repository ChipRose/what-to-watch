
import { store } from '..';

import type { GenreNameType, FilmsType, FilmType } from './film';
import type { ReviewsType } from './review';

export type GenreStateType = {
  activeGenre: GenreNameType;
  films: FilmsType;
  reviews: ReviewsType;
  catalog: FilmsType;
  activeFilm: {
    film: FilmType;
    reviews: ReviewsType;
  };
};

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
