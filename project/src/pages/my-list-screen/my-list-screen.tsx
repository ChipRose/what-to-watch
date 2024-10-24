import { FilmsList } from '../../types/film';

import Logo from '../../components/logo/logo';
import CardList from '../../components/cards-list/cards-list';


type MyListProps = {
  favoriteFilmCount: number;
  favoritesFilmsList: FilmsList;
};

function MyListScreen({ favoriteFilmCount, favoritesFilmsList }: MyListProps): JSX.Element {
  const isFooterLogo = true;

  return (
    <div className='user-page'>
      <header className='page-header user-page__head'>
        <Logo />

        <h1 className='page-title user-page__title'>My list</h1>

        <ul className='user-block'>
          <li className='user-block__item'>
            <div className='user-block__avatar'>
              <img src='img/avatar.jpg' alt='User avatar' width='63' height='63' />
            </div>
          </li>
          <li className='user-block__item'>
            <a className='user-block__link' href='/'>Sign out</a>
          </li>
        </ul>
      </header>

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <CardList filmsList={favoritesFilmsList} />

      </section>

      <footer className='page-footer'>

        <Logo isLight={isFooterLogo} />

        <div className='copyright'>
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
