import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  filmCount: number;
};

function App({ filmCount }: AppProps): JSX.Element {
  return <MainScreen filmCount={filmCount} />;
}

export default App;
