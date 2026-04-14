import { datatype, image, internet, lorem, name, random } from 'faker';
import type { ServerFilmType, ServerReviewType } from '../types/server-data';

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