import { GenreNameType, GenresTabsListType } from '../types/film';
import { StatusCodes } from 'http-status-codes';

export const BACKEND_URL = 'https://10.react.htmlacademy.pro/wtw';
export const REQUEST_TIMEOUT = 5000;
export const TIMEOUT_SHOW_ERROR = 3000;

export const TABS_COUNT = 9;

export enum AppRoute {
  Main = '/',
  LogIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  FilmPreviewType = ':id',
  AddReview = ':id/review',
  Player = '/player/:id',
  NotFound = '*',
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

export enum Genre {
  All = 'all',
  Comedy = 'comedy',
  Crime = 'crime',
  Documentary = 'documentary',
  Drama = 'drama',
  Horror = 'horror',
  KidsFamily = 'kids & family',
  Romance = 'romance',
  SciFi = 'sci-fi',
  Thriller = 'thriller',
  Adventure = 'adventure',
  Action = 'action',
  Fantasy = 'fantasy',
}

export enum CatalogCount {
  Init = 8,
  Similar = 4,
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

export const genresTabs = ['All genres', 'Comedies', 'Crime', 'Documentary', 'Dramas', 'Horror', 'Kids & Family', 'Romance', 'Sci-Fi', 'Thriller', 'Adventure', 'Action', 'Fantasy'] as const;
export const genres = ['all', 'comedy', 'crime', 'documentary', 'drama', 'horror', 'kids & family', 'romance', 'sci-fi', 'thriller', 'adventure', 'action', 'fantasy'] as const;

export const genreMapping: Record<GenreNameType, GenresTabsListType> = {
  [Genre.All]: genresTabs[0],
  [Genre.Comedy]: genresTabs[1],
  [Genre.Crime]: genresTabs[2],
  [Genre.Documentary]: genresTabs[3],
  [Genre.Drama]: genresTabs[4],
  [Genre.Horror]: genresTabs[5],
  [Genre.KidsFamily]: genresTabs[6],
  [Genre.Romance]: genresTabs[7],
  [Genre.SciFi]: genresTabs[8],
  [Genre.Thriller]: genresTabs[9],
  [Genre.Adventure]: genresTabs[10],
  [Genre.Action]: genresTabs[11],
  [Genre.Fantasy]: genresTabs[12],
} as const;

export const Action = {
  FETCH_USER_STATUS: 'userStatus/fetch',
  FETCH_FILMS: 'films/fetch',
  FETCH_SIMILAR_FILMS: 'similarFilms/fetch',
  FETCH_PROMO_FILM: 'promoFilm/fetch',
  FETCH_FILM: 'film/fetch',
  FETCH_REVIEWS: 'reviews/fetch',
  FETCH_TO_WATCH: 'filmsToWatch/fetch',
  FETCH_ADD_TO_WATCH: 'filmToWatch/fetch',
  LOAD_FILMS: 'films/load',
  LOAD_SIMILAR_FILMS: 'similarFilms/load',
  LOAD_FILM: 'film/load',
  LOAD_PROMO_FILM: 'promoFilm/load',
  LOAD_REVIEWS: 'reviews/load',
  LOAD_ACTIVE_FILM: 'activeFilm/load',
  LOAD_TO_WATCH_FILMS: 'toWatchFilms/load',
  LOAD_MORE_FILMS: 'catalog/load',
  CHECK_USER_AUTH: 'userAuth/check',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  REQUIRE_AUTHORIZATION: 'authorization/require',
  SET_FILMS_LOADED_STATUS: 'filmsLoadedStatus/set',
  SET_FILMS: 'films/set',
  SET_ACTIVE_FILM: 'activeFilm/set',
  SET_GENRE: 'genre/set',
  SET_REVIEWS: 'reviews/set',
  SET_CATALOG: 'catalog/set',
  SET_USER_DATA: 'userData/set',
  RESET_CATALOG: 'catalog/reset',
  RESET_APP: 'app/reset',
  REDIRECT_TO_ROUTE: 'toRoute/redirect'
};

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Comments = '/comments/',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite/',
}

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};


export enum NameSpace {
  User = 'USER',
  Film = 'FILM',
  Data = 'DATA'
}
