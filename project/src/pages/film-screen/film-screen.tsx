import { FilmsPreviewList, Film } from '../../types/film';

import Logo from '../../components/logo/logo';
import CardList from '../../components/cards-list/cards-list';
import FilmCard from '../../components/film-card/film-card';

type FilmScreenProps = {
  similarFilmCount: number;
  similarFilmsList: FilmsPreviewList;
  film: Film;
}

function FilmScreen({ similarFilmCount, film, similarFilmsList }: FilmScreenProps): JSX.Element {
  const isFooterLogo = true;
  const isFull = true;

  return (
    <>
      <FilmCard isFull={isFull} {...film} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CardList filmsList={similarFilmsList} />

        </section>

        <footer className="page-footer">
          <Logo isLight={isFooterLogo} />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmScreen;
