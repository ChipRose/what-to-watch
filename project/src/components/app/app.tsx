import { Routes, Route } from 'react-router-dom';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

import { useAppSelector } from '../../hooks/use-app-selector';

import { AppRoute, AuthorizationStatus } from '../../const/const';

import PrivateRoute from '../private-route/private-route';
import PageWrapper from '../page-wrapper/page-wrapper';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import Loader from '../loader/loader';

function App(): JSX.Element {
  const { isFilmsLoaded, authorizationStatus } = useAppSelector((state) => state);

  if (isFilmsLoaded) {
    return (<Loader />);
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main} element={<PageWrapper />}>
          <Route path={AppRoute.Main} element={<MainScreen />} />

          <Route path={AppRoute.LogIn} element={<LoginScreen />} />
          <Route path={AppRoute.Films}>
            <Route path={AppRoute.FilmPreviewType}
              element={
                <FilmScreen />
              }
            />

            <Route
              path={AppRoute.AddReview}
              element={
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <AddReviewScreen />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path={AppRoute.Player} element={<PlayerScreen />} />
          <Route
            path={AppRoute.MyList}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <MyListScreen />
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
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
