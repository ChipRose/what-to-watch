import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const/const';
import { FilmsPreviewList, Film } from '../../types/film';
import { ReviewsList } from '../../types/review';

import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../const/const';

type AppProps = {
  filmCount: number;
  favoriteFilmCount: number;
  similarFilmCount: number;
  filmsList: FilmsPreviewList;
  reviewsList: ReviewsList;
  activeFilm: Film;
};

function App({ filmCount, favoriteFilmCount, similarFilmCount, filmsList, activeFilm, reviewsList }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen filmCount={filmCount} activeFilm={activeFilm} filmsList={filmsList} />} />
        <Route path={AppRoute.LogIn} element={<LoginScreen />} />
        <Route path={AppRoute.Film} element={<FilmScreen film={activeFilm} similarFilmCount={similarFilmCount} similarFilmsList={filmsList} />} />
        <Route path={AppRoute.Player} element={<PlayerScreen />} />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <MyListScreen favoriteFilmCount={favoriteFilmCount} favoritesFilmsList={filmsList} />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <AddReviewScreen />
            </PrivateRoute>
          }
        />
        <Route path={'*'} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
