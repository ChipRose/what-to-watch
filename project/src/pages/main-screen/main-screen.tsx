import { useEffect } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setGenre, setCatalog, loadMoreToCatalog } from '../../store/actions';

import { CatalogCount } from '../../const/const';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import Catalog from '../../components/catalog/catalog';
import ShowMore from '../../components/show-more/show-more';


function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { promoFilm } = useAppSelector((state) => state);
  const catalogFilms = useAppSelector((state) => state.catalog?.films);
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
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.cover} alt={promoFilm?.title} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.realized}</span>
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

          <Catalog filmsList={catalogFilms} />

          {
            isShowLoadMoreButton ? (
              <div className='catalog__more'>
                <ShowMore onUpdate={handleShowMoreButtonClick} />
              </div>
            ) : null
          }
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
