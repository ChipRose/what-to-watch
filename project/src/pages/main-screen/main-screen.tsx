import { useEffect } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setGenre, setCatalog, loadMoreToCatalog } from '../../store/actions';

import { CatalogCount } from '../../const/const';

import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';
import GenreList from '../../components/genre-list/genre-list';
import Catalog from '../../components/catalog/catalog';
import ShowMore from '../../components/show-more/show-more';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeFilm = useAppSelector((state) => state.activeFilm.film);
  const isShowLoadMoreButton = useAppSelector((state) => !state.catalog.isAllShown);

  const handleShowMoreButtonClick = () => {
    dispatch(loadMoreToCatalog());
  };

  useEffect(() => {
    dispatch(setGenre('all'));
    dispatch(setCatalog(CatalogCount.Init));
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{activeFilm.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{activeFilm.genre}</span>
                <span className="film-card__year">{activeFilm.realized}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <GenreList />

          <Catalog />

          {
            isShowLoadMoreButton ? (
              <div className='catalog__more'>
                <ShowMore onUpdate={handleShowMoreButtonClick} />
              </div>
            ) : null
          }
        </section>

        <footer className='page-footer'>

          <Logo variant='light' />

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
