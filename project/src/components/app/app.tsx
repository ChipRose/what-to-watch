import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const/const';

import PrivateRoute from '../private-route/private-route';
import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import { AuthorizationStatus } from '../../const/const';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen />} />

        <Route path={AppRoute.LogIn} element={<LoginScreen />} />
        <Route path={AppRoute.Films}>
          <Route path={AppRoute.FilmPreviewType}
            element={
              <FilmScreen/>
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
