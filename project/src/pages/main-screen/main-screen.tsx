import { FilmsType, FilmType } from '../../types/film';
import { TabsType } from '../../types/tabs';

import { TabsModification } from '../../const/const';

import { groupByProperty } from '../../util/util';

import Catalog from '../../components/catalog/catalog';
import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';
import TabsList from '../../components/tabs-list/tabs-list';

type MainProps = {
  filmsList: FilmsType;
  activeFilm: FilmType;
};

const getTabsList = (film: FilmsType): TabsType => {
  const filmsByGenre = groupByProperty(film, 'genre');
  const genres = Object.keys(filmsByGenre);

  const tabsList = Array.from(genres, (genre, index) => ({
    id: index,
    title: genre,
    component: <Catalog filmsList={filmsByGenre[genre]} />
  }));
  return tabsList;
};

function MainScreen({ filmsList, activeFilm }: MainProps): JSX.Element {
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
              <h2 className="film-card__title">The Grand Budapest Hotel</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">Drama</span>
                <span className="film-card__year">2014</span>
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

          <TabsList tabsList={getTabsList(filmsList)} type={TabsModification.Catalog} />

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
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
