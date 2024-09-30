// import MainScreen from '../../pages/main-screen/main-screen';
// import LoginScreen from '../../pages/login-screen/login-screen';
import MyList from '../../pages/my-list/my-list';

type AppProps = {
  filmCount: number;
};

function App({ filmCount }: AppProps): JSX.Element {
  // return <MainScreen filmCount={filmCount} />;
  return <MyList />;

}

export default App;
