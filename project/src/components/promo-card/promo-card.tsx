// import { memo } from 'react';

import type { FilmType } from '../../types/film';

import ControlButtonsList from '../control-buttons-list/control-buttons-list';
import Header from '../header/header';

type PromoSectionProps = {
  film: FilmType | null;
};

function PromoCard({ film }: PromoSectionProps): JSX.Element | null {
  return film ? (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={film.backgroundImage} alt={film.title} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header />

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={film.cover} alt={film.title} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{film.title}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.releaseDate}</span>
            </p>

            <ControlButtonsList hasReview={false} film={film} />
          </div>
        </div>
      </div>
    </section>
  ) : null;
}

// const areEqual = (prevProps: PromoSectionProps, nextProps: PromoSectionProps): boolean => (
//   prevProps.film?.id === nextProps.film?.id &&
//   prevProps.film?.isFavorite === nextProps.film?.isFavorite
// );

export default PromoCard;
