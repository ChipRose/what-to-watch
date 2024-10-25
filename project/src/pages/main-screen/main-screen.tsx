import { FilmsPreviewList, Film } from '../../types/film';

import FilmCard from '../../components/film-card/film-card';
import CardList from '../../components/cards-list/cards-list';
import Logo from '../../components/logo/logo';

type MainProps = {
  filmCount: number;
  filmsList: FilmsPreviewList;
  activeFilm: Film;
};

function MainScreen({ filmCount = 0, filmsList, activeFilm }: MainProps): JSX.Element {
  const isFooterLogo = true;
  const isFull = false;

  return (
    <>
      <FilmCard isFull={isFull} {...activeFilm} />

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <ul className='catalog__genres-list'>
            <li className='catalog__genres-item catalog__genres-item--active'>
              <a href='/' className='catalog__genres-link'>
                All genres
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Comedies
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Crime
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Documentary
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Dramas
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Horror
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Kids & Family
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Romance
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Sci-Fi
              </a>
            </li>
            <li className='catalog__genres-item'>
              <a href='/' className='catalog__genres-link'>
                Thrillers
              </a>
            </li>
          </ul>

          <CardList filmsList={filmsList} />

          <div className='catalog__more'>
            <button className='catalog__button' type='button'>
              Show more
            </button>
          </div>
        </section>

        <footer className='page-footer'>

          <Logo isLight={isFooterLogo} />

          <div className='copyright'>
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;
