import { FilmsPreviewList } from '../../types/film';

import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';
import CardList from '../../components/cards-list/cards-list';

type MyListProps = {
  favoriteFilmCount: number;
  favoritesFilmsList: FilmsPreviewList;
};

function MyListScreen({ favoriteFilmCount, favoritesFilmsList }: MyListProps): JSX.Element {

  return (
    <div className='user-page'>
      <Header variant='user-page' titleRender={() => (<h1 className='page-title user-page__title' >My list</h1>)} />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <CardList filmsList={favoritesFilmsList} />

      </section>

      <footer className='page-footer'>

        <Logo variant='light' />

        <div className='copyright'>
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;
