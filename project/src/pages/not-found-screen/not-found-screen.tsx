import { Link } from 'react-router-dom';
import './style.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="container">
      <h1 className="title">404 - Страница не найдена</h1>
      <p className='text'>
        Извините, запрашиваемая страница не существует.
      </p>
      <Link to="/" className="link">
        Вернуться на главную
      </Link>
    </div>
  );
}

export default NotFoundScreen;
