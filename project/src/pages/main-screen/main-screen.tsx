import { useState } from 'react';
import { Link } from 'react-router-dom';

import { FilmsPreviewList, FilmFullInfo } from '../../types/film';
import { genreTabs } from '../../const/const';

import Catalog from '../../components/catalog/catalog';
import Logo from '../../components/logo/logo';
import Header from '../../components/header/header';

type MainProps = {
  filmsList: FilmsPreviewList;
  activeFilm: FilmFullInfo;
};

type TabsProps = {
  activeTab: number;
  onUpdate: (id: number) => void;
};

function TabsList({ activeTab, onUpdate }: TabsProps) {

  const handleClick = (id: number) => {
    onUpdate(id);
  };

  return (
    <ul className='catalog__genres-list'>
      {
        genreTabs?.map(({ id: tabId, title }) => (
          <li
            className={`catalog__genres-item ${tabId === activeTab ? 'catalog__genres-item--active' : ''}`}
            key={tabId}
          >
            <Link
              to='/'
              className='catalog__genres-link'
              onClick={() => handleClick(tabId)}
            >
              {title}
            </Link>
          </li>
        ))
      }

    </ul>
  );
}

function MainScreen({ filmsList, activeFilm }: MainProps): JSX.Element {
  const ACTIVE_TAB = 0;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<number>(ACTIVE_TAB);

  const onTabClick = (id: number) => {
    setActiveTab(id);
  };

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

          <TabsList activeTab={activeTab} onUpdate={onTabClick} />

          <Catalog filmsList={filmsList} />

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
