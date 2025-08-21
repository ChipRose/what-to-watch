import { useEffect } from 'react';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchPromoFilmAction } from '../../store/api-actions';
import { getPromoFilm, getCatalog } from '../../store/film-data/selectors';
import { loadMoreToCatalog } from '../../store/film-data/film-data';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import Catalog from '../../components/catalog/catalog';
import ShowMoreButton from '../../components/buttons/show-more-button/show-more-button';
import ControlButtonsList from '../../components/control-buttons-list/control-buttons-list';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const catalogFilms = useAppSelector(getCatalog).films;
  const isShowLoadMoreButton = !useAppSelector(getCatalog).isAllShown;

  const handleShowMoreButtonClick = () => {
    dispatch(loadMoreToCatalog());
  };

  useEffect(() => {
    dispatch(fetchPromoFilmAction());
    // dispatch(setGenre('all'));
    // dispatch(setCatalog(CatalogCount.Init));
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
                <span className="film-card__year">{promoFilm?.releaseDate}</span>
              </p>

              <ControlButtonsList isFullList={false} />

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
                <ShowMoreButton onUpdate={handleShowMoreButtonClick} />
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
