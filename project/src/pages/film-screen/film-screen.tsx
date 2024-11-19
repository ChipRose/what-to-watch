import { useParams } from 'react-router-dom';
import { FilmsPreviewList, FilmList } from '../../types/film';
import { ReviewsType } from '../../types/review';

import Logo from '../../components/logo/logo';
import Catalog from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';

type FilmScreenProps = {
  similarFilmsList: FilmsPreviewList;
  reviewsList: ReviewsType;
  filmsList: FilmList;
}

type RouteParams = {
  id: string;
}

function FilmScreen({ filmsList, similarFilmsList, reviewsList }: FilmScreenProps): JSX.Element {
  const isFull = true;
  const { id } = useParams<RouteParams>();
  const activeFilm = filmsList?.find(({ id: filmId }) => filmId === Number(id)) || filmsList[0];

  return (
    <>
      <FilmCard isFull={isFull} {...activeFilm} reviewsList={reviewsList} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <Catalog filmsList={similarFilmsList} />

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
