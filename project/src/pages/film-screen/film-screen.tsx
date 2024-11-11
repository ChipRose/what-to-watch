import { FilmsPreviewList, FilmFullInfo } from '../../types/film';
import { FilmReviewsList } from '../../types/review';

import Logo from '../../components/logo/logo';
import CardList from '../../components/cards-list/cards-list';
import FilmCard from '../../components/film-card/film-card';

type FilmScreenProps = {
  similarFilmCount: number;
  similarFilmsList: FilmsPreviewList;
  reviewsList: FilmReviewsList;
  film: FilmFullInfo;
}

function FilmScreen({ similarFilmCount, film, similarFilmsList, reviewsList }: FilmScreenProps): JSX.Element {
  const isFull = true;

  return (
    <>
      <FilmCard isFull={isFull} {...film} reviewsList={reviewsList} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <CardList filmsList={similarFilmsList} />

        </section>

        <footer className="page-footer">
          <Logo variant='light' />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default FilmScreen;
