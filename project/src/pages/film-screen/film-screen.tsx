import { useParams } from 'react-router-dom';

import type { ReviewsType } from '../../types/review';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { setActiveFilm, setGenre, setCatalog, setActiveReviews } from '../../store/actions';

import {
  getItemsByKey,
  groupByGenre
} from '../../util/util';

import Logo from '../../components/logo/logo';
import Catalog from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';
import { FilmType, GenreNameType } from '../../types/film';

type RouteParams = {
  id: string;
}

function FilmScreen(): JSX.Element {
  const isFull = true;
  const SIMILAR_FILMS_COUNT = 4;
  const { id } = useParams<RouteParams>();
  const pageId = Number(id);

  const films = useAppSelector((state) => state.films);
  const reviewsList = useAppSelector((state) => state.reviews);
  const activeFilm = films?.find(({ id: filmId }) => filmId === pageId) as FilmType || films[0];
  const activeGenre = activeFilm.genre.toLowerCase() as GenreNameType || films[0].genre.toLowerCase();
  const activeReviews = getItemsByKey([pageId], reviewsList, 'filmId') as ReviewsType;
  const similarFilms = groupByGenre(films)[activeGenre];

  const dispatch = useAppDispatch();

  dispatch(setActiveFilm(activeFilm));
  dispatch(setGenre(activeGenre));
  dispatch(setCatalog(similarFilms?.length > SIMILAR_FILMS_COUNT ? similarFilms?.slice(0, SIMILAR_FILMS_COUNT) : similarFilms));
  dispatch(setActiveReviews(activeReviews));

  return (
    <>
      <FilmCard isFull={isFull} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <Catalog />

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
