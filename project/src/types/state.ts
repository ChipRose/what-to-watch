
import { store } from '..';

import type { GenreNameType, FilmsType, FilmType } from './film';


export type GenreStateType = {
  activeGenre: GenreNameType;
  films: FilmsType;
  catalog: FilmsType;
  activeFilm: FilmType;
};

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
