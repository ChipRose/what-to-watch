import Card from '../../components/card/card';
import Logo from '../../components/logo/logo';

type MyListProps = {
  favoriteFilmCount: number;
};

function MyListScreen({ favoriteFilmCount }: MyListProps): JSX.Element {
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

        <div className='catalog__films-list'>
          {
            Array.from({ length: favoriteFilmCount }, (_, key) => (
              <Card key={key} />
            ))
          }
        </div>
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
