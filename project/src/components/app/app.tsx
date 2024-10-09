import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AppRoute } from '../../const/const';

import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
// import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type AppProps = {
  filmCount: number;
  favoriteFilmCount: number;
  similarFilmCount: number;
};

function App({ filmCount, favoriteFilmCount, similarFilmCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<MainScreen filmCount={filmCount} />} />
        <Route path={AppRoute.LogIn} element={<LoginScreen />} />
        <Route path={AppRoute.MyList} element={<MyListScreen favoriteFilmCount={favoriteFilmCount} />} />
        <Route path={AppRoute.Film} element={<FilmScreen similarFilmCount={similarFilmCount} />} />
        <Route path={AppRoute.Player} element={<PlayerScreen />} />
        <Route path={'*'} element={<NotFoundScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
