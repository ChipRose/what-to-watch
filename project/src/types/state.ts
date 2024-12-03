
import { FilmsType } from './film';

import { genres } from '../const/const';

export type GenreNameType = typeof genres[number];

export type GenreStateType = {
  genre: GenreNameType | null;
  films: FilmsType | [];
};
