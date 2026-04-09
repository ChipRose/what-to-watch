import { genreMapping } from '../const/const';

export type GenreType = keyof typeof genreMapping;

export type GenreTitleType = typeof genreMapping[GenreType];

export type GenreListType = Array<keyof typeof genreMapping>;
