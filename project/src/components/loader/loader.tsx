import './style.css';

type LoaderProps = {
  isLoading: boolean;
}

function Loader({ isLoading }: LoaderProps): JSX.Element | null {
  return isLoading ? (
    <div id="loader" className="loader"></div>
  ) : null;
}

export default Loader;
