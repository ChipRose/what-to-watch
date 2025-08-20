import { useAppSelector } from '../../hooks/use-app-selector';
import { getError } from '../../store/film-data/selectors';

import './style.css';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);

  // eslint-disable-next-line no-console
  console.log( error);

  return error
    ? <div className="error-message">{error} </div>
    : null;
}

export default ErrorMessage;
