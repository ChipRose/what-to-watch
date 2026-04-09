import { genreMapping } from '../const/const';

export type GenreType = keyof typeof genreMapping;

export type genreListType = Array<keyof typeof genreMapping>;
