// import MainScreen from '../../pages/main-screen/main-screen';
// import LoginScreen from '../../pages/login-screen/login-screen';
// import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import FilmScreen from '../../pages/film-screen/film-screen';

type AppProps = {
  filmCount: number;
  favoriteFilmCount: number;
  similarFilmCount: number;
};

function App({ filmCount, favoriteFilmCount, similarFilmCount }: AppProps): JSX.Element {
  // return <MainScreen filmCount={filmCount} />;
  // return <MyList favoriteFilmCount={favoriteFilmCount} />;
  return <FilmScreen similarFilmCount={similarFilmCount} />;
}

export default App;
