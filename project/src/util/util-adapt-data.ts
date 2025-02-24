import type { FilmsType, FilmType } from '../types/film';
import type { ServerFilmsType, ServerFilmType } from '../types/server-data';

export const adaptFilmsDataToApp = (data: ServerFilmsType): FilmsType => {

  const adaptFilmToApp = (film: ServerFilmType): FilmType => ({
    id: film.id,
    title: film.name,
    description: film.description,
    director: film.director,
    starring: film.starring,
    runTime: film.runTime,
    genre: film.genre ?? '',
    realized: film.realized,
    previewImage: film.previewImage,
    src: '',
    rating: film.rating,
    ratingCount: film.scoresCount,
    backgroundImage: film.backgroundImage,
    cover: film.posterImage,
    previewSrc: film.previewVideoLink,
  });


  return Array.from(data, (film, _) => adaptFilmToApp(film));
};
