import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getSimilarFilms, getActiveFilm } from '../../store/film-data/selectors';
import { loadFilmInfoAction } from '../../store/actions';

import Catalog from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';

type RouteParams = {
  id: string;
}

function FilmScreen(): JSX.Element {
  const { id } = useParams<RouteParams>();
  const pageId = Number(id);

  const dispatch = useAppDispatch();
  const similarFilms = useAppSelector(getSimilarFilms);
  const activeFilm = useAppSelector(getActiveFilm);

  useEffect(() => {
    if (!pageId) {
      return;
    }
    dispatch(loadFilmInfoAction(pageId));
  }, [dispatch, pageId]);

  return (
    <>
      <FilmCard activeFilm={activeFilm} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <Catalog filmsList={similarFilms ?? []} />
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;
