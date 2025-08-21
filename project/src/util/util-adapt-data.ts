import type { FilmsType, FilmType } from '../types/film';
import type { ReviewType, ReviewsType } from '../types/review';
import type { ServerFilmsType, ServerFilmType, ServerReviewType, ServerReviewsType } from '../types/server-data';

export const adaptFilmToApp = (film: ServerFilmType | null): FilmType | null => (
  film ? ({
    id: film.id,
    title: film.name,
    description: film.description,
    director: film.director,
    starring: film.starring,
    runTime: film.runTime,
    genre: film.genre ?? '',
    releaseDate: film.released,
    previewImage: film.previewImage,
    src: '',
    isFavorite: film.isFavorite,
    rating: film.rating,
    ratingCount: film.scoresCount,
    backgroundImage: film.backgroundImage,
    backgroundColor: film.backgroundColor,
    cover: film.posterImage,
    previewSrc: film.previewVideoLink,
  }) : null
);

export const adaptFilmsDataToApp = (data: ServerFilmsType | null): FilmsType | null => {
  const films = data ? Array.from(data, (film, _) => adaptFilmToApp(film)) : null;
  return films ? films.filter((film): film is FilmType => film !== null) : null;
};

export const adaptReviewsToApp = (data: ServerReviewsType): ReviewsType => {

  const adaptReviewToApp = (review: ServerReviewType): ReviewType => ({
    id: review?.id,
    rating: review?.rating,
    text: review?.comment,
    author: review?.user?.name,
    date: review?.date,
  });

  return Array.from(data, (review, _) => adaptReviewToApp(review));
};
