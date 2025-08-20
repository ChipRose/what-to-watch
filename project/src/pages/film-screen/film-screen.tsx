import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getActiveFilm } from '../../store/film-process/selectors';

import {
  fetchReviewsAction,
  fetchFilmAction,
  fetchSimilarFilmAction
} from '../../store/api-actions';

import Catalog from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';

type RouteParams = {
  id: string;
}

function FilmScreen(): JSX.Element {
  const isFull = true;
  const { id } = useParams<RouteParams>();
  const pageId = Number(id);

  const dispatch = useAppDispatch();
  const activeFilmId = useAppSelector(getActiveFilm).film?.id ?? null;
  const { similarFilms } = useAppSelector(getActiveFilm) ?? {};


  useEffect(() => {
    if (activeFilmId !== pageId) {
      dispatch(fetchFilmAction(pageId));
    } else {
      dispatch(fetchSimilarFilmAction(activeFilmId));
      dispatch(fetchReviewsAction(activeFilmId));
    }
  }, [dispatch, activeFilmId, pageId]);

  return (
    <>
      <FilmCard isFull={isFull} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <Catalog filmsList={similarFilms} />

        </section>

        <Footer/>
      </div>
    </>
  );
}

export default FilmScreen;
