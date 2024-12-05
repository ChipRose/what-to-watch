
import { store } from '..';

import type { GenreNameType, FilmsType, FilmType, GroupedFilmsType } from './film';
import type { ReviewsType } from './review';

export type GenreStateType = {
  activeGenre: GenreNameType;
  films: FilmsType;
  groupedFilms: GroupedFilmsType;
  reviews: ReviewsType;
  catalog: {
    count: number | null;
    films: FilmsType;
  };
  activeFilm: {
    film: FilmType;
    reviews: ReviewsType;
  };
};

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
