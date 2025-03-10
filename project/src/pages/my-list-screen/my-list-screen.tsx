import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import { fetchToWhatchFilms } from '../../store/api-actions';

function MyListScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const myList = useAppSelector((state) => state.myList) ?? [];

  useEffect(() => {
    dispatch(fetchToWhatchFilms());
  }, [dispatch]);

  return (
    <div className='user-page'>
      <Header variant='user-page' titleRender={() => (<h1 className='page-title user-page__title' >My list</h1>)} />

      <section className='catalog'>
        <h2 className='catalog__title visually-hidden'>Catalog</h2>

        <Catalog filmsList={myList} />

      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
