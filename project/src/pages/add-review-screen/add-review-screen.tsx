import { memo, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';

import { AppRoute } from '../../const/const';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilms } from '../../store/film-data/selectors';

import AddReviewForm from '../../components/add-review-form/add-review-form';
import Header from '../../components/header/header';

type NavigationPanelProps = {
  filmId: number | null;
  filmTitle: string;
};

type RouteParams = {
  id: string;
}

type AddReviewHeaderProps = {
  activeFilmId: number | null;
  activeFilmTitle: string;
  activeFilmBackgroundImage: string;
  activeFilmCover: string;
};

function ReviewsBreadcrumbs({ filmId, filmTitle }: NavigationPanelProps): JSX.Element | null {
  return filmId ? (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.Films}/${String(filmId)}`} className="breadcrumbs__link">{filmTitle}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to='#'>Add review</Link>
        </li>
      </ul>
    </nav>
  ) : null;
}

function ReviewHeader({ activeFilmId, activeFilmTitle, activeFilmBackgroundImage, activeFilmCover }: AddReviewHeaderProps): JSX.Element {
  const navRender = useCallback(
    () => <ReviewsBreadcrumbs filmId={activeFilmId} filmTitle={activeFilmTitle} />,
    [activeFilmId, activeFilmTitle]
  );

  return (
    <div className="film-card__header">
      <div className="film-card__bg">
        <img src={activeFilmBackgroundImage} alt={activeFilmTitle} />
      </div>

      <h1 className="visually-hidden">WTW</h1>
      <Header navRender={navRender} />

      <div className="film-card__poster film-card__poster--small">
        <img src={activeFilmCover} alt={activeFilmTitle} width="218" height="327" />
      </div>
    </div>
  );
}

const MemoAddReviewHeader = memo(ReviewHeader);

function AddReviewScreen(): JSX.Element {
  const { id } = useParams<RouteParams>();

  const activeFilmId = Number(id);
  const activeFilm = useAppSelector(getFilms)?.find((film) => film.id === Number(id)) ?? null;
  const activeFilmTitle = activeFilm?.title ?? '';
  const activeFilmBackgroundImage = activeFilm?.backgroundImage ?? '';
  const activeFilmCover = activeFilm?.cover ?? '';

  return (
    <section className="film-card film-card--full">
      <MemoAddReviewHeader
        activeFilmId={activeFilmId}
        activeFilmTitle={activeFilmTitle}
        activeFilmBackgroundImage={activeFilmBackgroundImage}
        activeFilmCover={activeFilmCover}
      />

      <AddReviewForm filmId={activeFilmId} />

    </section>
  );
}

export default AddReviewScreen;
