// import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';

type AppProps = {
  filmCount: number;
};

function App({ filmCount }: AppProps): JSX.Element {
  // return <MainScreen filmCount={filmCount} />;
  return <LoginScreen />;

}

export default App;
