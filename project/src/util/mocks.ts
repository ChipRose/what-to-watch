import { datatype, image, internet, lorem, name, random } from 'faker';
import { genreMapping } from '../const/const';

import { adaptFilmToApp } from './util-adapt-data';

import type { ServerFilmType, ServerReviewType } from '../types/server-data';
import type { GenreListType } from '../types/genre';
import type { FilmDescriptionType, FilmDetailsType } from '../types/film';

export const makeTestFilm = (): ServerFilmType => ({
  id: datatype.number(),
  name: lorem.words(2),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  description: lorem.sentence(),
  rating: datatype.float({ min: 1, max: 10, precision: 0.1 }),
  scoresCount: datatype.number({ min: 1, max: 10000 }),
  director: name.findName(),
  starring: [name.findName()],
  runTime: datatype.number({ min: 60, max: 240 }),
  genre: random.arrayElement(['Drama', 'Comedy', 'Crime', 'Thriller', 'Adventure']),
  released: datatype.number({ min: 1980, max: 2025 }),
  isFavorite: datatype.boolean(),
  videoLink: internet.url(),
  previewVideoLink: internet.url(),
});

export const makeTestFilms = (): ServerFilmType[] => {
  const FILMS_COUNT = 20;
  return Array.from({ length: FILMS_COUNT }, makeTestFilm);
};

export const makeReview = (): ServerReviewType => ({
  id: datatype.number(),
  comment: lorem.sentence(),
  date: new Date().toISOString(),
  rating: datatype.number({ min: 1, max: 10 }),
  user: {
    id: datatype.number(),
    name: name.findName(),
  },
});

export const makeReviews = (): ServerReviewType[] => {
  const REVIEWS_COUNT = 20;
  return Array.from({ length: REVIEWS_COUNT }, makeReview);
};

export const makeTestGenresList = (): GenreListType => {
  return Object.keys(genreMapping) as GenreListType;
};

export  const makeTestDetailsProps = (): FilmDetailsType => {
  const mockAdaptedFilm = adaptFilmToApp(makeTestFilm());
  return {
    director: mockAdaptedFilm?.director ?? '',
    starring: mockAdaptedFilm?.starring ?? [],
    runTime: mockAdaptedFilm?.runTime ?? 0,
    genre: mockAdaptedFilm?.genre ?? '',
    releaseDate: mockAdaptedFilm?.releaseDate ?? 0,
  };
};

export const makeTestDescriptionProps = (): FilmDescriptionType => {
  const mockAdaptedFilm = adaptFilmToApp(makeTestFilm());
  return {
    rating: mockAdaptedFilm?.rating ?? 0,
    ratingCount: mockAdaptedFilm?.ratingCount ?? 0,
    description: mockAdaptedFilm?.description ?? '',
    director: mockAdaptedFilm?.director ?? '',
    starring: mockAdaptedFilm?.starring ?? [],
  };
};