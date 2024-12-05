import { GenreNameType, GenresTabsListType } from '../types/film';

export enum AppRoute {
  Main = '/',
  LogIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  FilmPreviewType = ':id',
  AddReview = ':id/review',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Estimation {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome',
}

export enum CatalogCount {
  Init = 8,
  Similar = 4,
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

export const genresTabs = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thriller'] as const;
export const genres = ['all', 'comedy', 'crime', 'documentary', 'drama', 'horror', 'kids & family', 'romance', 'sci-fi', 'thriller'] as const;

export const genreMapping: Record<GenreNameType, GenresTabsListType> = {
  [genres[0]]: genresTabs[0],
  [genres[1]]: genresTabs[1],
  [genres[2]]: genresTabs[2],
  [genres[3]]: genresTabs[3],
  [genres[4]]: genresTabs[4],
  [genres[5]]: genresTabs[5],
  [genres[6]]: genresTabs[6],
  [genres[7]]: genresTabs[7],
  [genres[8]]: genresTabs[8],
  [genres[9]]: genresTabs[9],
} as const;
