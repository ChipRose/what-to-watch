import { genres, genresTabs } from '../const/const';

export type FilmIdType = number;

export type FilmPreviewType = {
  id: FilmIdType;
  previewSrc: string;
  previewImage: string;
  title: string;
};

export type FilmsPreviewType = FilmPreviewType[];

export type FilmDescriptionType = {
  director: string;
  description: string;
  starring: string[];
  rating: number;
  ratingCount: number;
};

export type FilmDetailsType = {
  director: string;
  starring: string[];
  runTime: number;
  genre: string;
  realized: number;
};

export type FilmType = FilmPreviewType & FilmDescriptionType & FilmDetailsType & {
  src: string;
  backgroundImage: string;
  backgroundColor: string;
  cover: string;
};

export type FilmsType = FilmType[];

export type GroupedFilmsType = Record<string, FilmsType>;
export type GenreNameType = typeof genres[number];
export type GenresTabsListType = typeof genresTabs[number];
