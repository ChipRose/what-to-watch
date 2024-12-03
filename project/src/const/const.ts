// import { GenreTabType, GenreNameType } from '../types/film';

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

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

export enum TabsModification {
  Catalog = 'CATALOG',
  Navigation = 'NAVIGATION'
}

export const genresTabsList = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thriller'] as const;
export const genres = ['Comedy', 'Crime', 'Documentary', 'Drama', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thriller'] as const;

// export const genresTabs: { [key in GenreTabType]: GenreNameType } = {
//   'All genres':null,
//   'Comedies': genres[0],
//   'Crime': genres[1],
//   'Documentary': genres[2],
//   'Dramas': genres[3],
//   'Horror': genres[4],
//   'Kids & Family': genres[5],
//   'Romance': genres[6],
//   'Sci-Fi': genres[7],
//   'Thriller': genres[8],
// };
