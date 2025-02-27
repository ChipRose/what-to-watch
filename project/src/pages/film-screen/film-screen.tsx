import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';

import { setCatalog } from '../../store/actions';

import { fetchReviewsAction, fetchFilmAction } from '../../store/api-actions';

import { CatalogCount } from '../../const/const';

import Logo from '../../components/logo/logo';
import Catalog from '../../components/catalog/catalog';
import FilmCard from '../../components/film-card/film-card';

type RouteParams = {
  id: string;
}

function FilmScreen(): JSX.Element {
  const isFull = true;
  const { id } = useParams<RouteParams>();
  const pageId = Number(id);
  const activeFilmId = useAppSelector((state) => state.activeFilm?.film?.id) || null;

  const dispatch = useAppDispatch();

  useEffect(() => {
    activeFilmId !== pageId && dispatch(fetchFilmAction(pageId));
    activeFilmId !== pageId && dispatch(fetchReviewsAction(pageId));
    dispatch(setCatalog(CatalogCount.Similar));
  }, [dispatch, activeFilmId, pageId]);

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
