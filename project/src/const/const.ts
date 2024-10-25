export enum AppRoute {
  Main = '/',
  LogIn = '/login',
  MyList = '/mylist',
  Films='/films',
  Film = '/:id',
  AddReview = '/:id/add-review',
  Reviews = '/:id/reviews',
  Player = '/player/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
