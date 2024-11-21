import { useParams } from 'react-router-dom';
import { FilmsType } from '../../types/film';
import { ReviewsType } from '../../types/review';

import { getItemsByKey, groupByProperty } from '../../util/util';

import Logo from '../../components/logo/logo';
import Catalog from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';

type FilmScreenProps = {
  reviewsList: ReviewsType;
  filmsList: FilmsType;
}

type RouteParams = {
  id: string;
}

function FilmScreen({ filmsList, reviewsList }: FilmScreenProps): JSX.Element {
  const isFull = true;
  const SIMILAR_FILMS_COUNT = 4;
  const { id } = useParams<RouteParams>();
  const pageId = Number(id);
  const activeFilm = filmsList?.find(({ id: filmId }) => filmId === pageId) || filmsList[0];
  const reviews: ReviewsType = getItemsByKey([pageId], reviewsList, 'filmId');
  const filmsInGenre = groupByProperty(filmsList, 'genre')[activeFilm.genre];
  const similarFilms = filmsInGenre?.length > SIMILAR_FILMS_COUNT ? filmsList?.slice(0, SIMILAR_FILMS_COUNT) : filmsInGenre;

  return (
    <>
      <FilmCard isFull={isFull} {...activeFilm} reviewsList={reviews} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <Catalog filmsList={similarFilms} />

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
