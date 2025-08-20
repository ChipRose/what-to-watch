import { Link } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getActiveFilm } from '../../store/film-process/selectors';

import type { FilmType } from '../../types/film';

import { AppRoute } from '../../const/const';

import AddReviewForm from '../../components/add-review-form/add-review-form';
import Header from '../../components/header/header';

type NavigationPanelProps = {
  film: FilmType | null;
}

function ReviewsBreadcrumbs({ film }: NavigationPanelProps): JSX.Element | null {
  return film ? (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`${AppRoute.Films}/${String(film.id)}`} className="breadcrumbs__link">{film.title}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link className="breadcrumbs__link" to='#'>Add review</Link>
        </li>
      </ul>
    </nav>
  ) : null;
}

function AddReviewScreen(): JSX.Element {
  const activeFilm = useAppSelector(getActiveFilm).film;
  const activeFilmId = activeFilm?.id ?? null;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={activeFilm?.backgroundImage} alt={activeFilm?.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>
        <Header navRender={() => (<ReviewsBreadcrumbs film={activeFilm} />)} />

        <div className="film-card__poster film-card__poster--small">
          <img src={activeFilm?.cover} alt={activeFilm?.title} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm filmId={activeFilmId} />

    </section>
  );
}

export default AddReviewScreen;
