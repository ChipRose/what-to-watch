export enum AppRoute {
  Main = '/',
  LogIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  Film = ':id',
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

export const genreTabs = [
  {
    id: 0,
    title: 'All genres'
  },
  {
    id: 1,
    title: 'Comedies'
  },
  {
    id: 2,
    title: 'Crime'
  },
  {
    id: 3,
    title: 'Documentary'
  },
  {
    id: 4,
    title: 'Dramas'
  },
  {
    id: 5,
    title: 'Horror'
  },
  {
    id: 6,
    title: 'Kids & Family'
  },
  {
    id: 7,
    title: 'Romance'
  },
  {
    id: 8,
    title: 'Sci-Fi'
  },
  {
    id: 9,
    title: 'Thrillers'
  },
];
