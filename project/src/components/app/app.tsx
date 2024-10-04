// import MainScreen from '../../pages/main-screen/main-screen';
// import LoginScreen from '../../pages/login-screen/login-screen';
import MyList from '../../pages/my-list/my-list';

type AppProps = {
  filmCount: number;
  favoriteFilmCount: number;
};

function App({ filmCount, favoriteFilmCount }: AppProps): JSX.Element {
  // return <MainScreen filmCount={filmCount} />;
  return <MyList favoriteFilmCount={favoriteFilmCount} />;

}

export default App;
