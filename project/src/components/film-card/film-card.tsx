import { memo } from 'react';

import { TABS_LIST } from '../../const/const';
import { calcArraySumProps } from '../../util/util';

import Header from '../header/header';
import TabsList from '../tabs-list/tabs-list';
import ControlButtonsList from '../control-buttons-list/control-buttons-list';

import type { FilmDescriptionType, FilmDetailsType, FilmType } from '../../types/film';
import type { ReviewsType } from '../../types/review';
import type { FilmDataType } from '../../types/state';

type HeroSectionProps = {
  film: FilmType;
};

type FilmCardProps = {
  activeFilm: FilmDataType['activeFilm'];
};

type TabsSectionProps = {
  film: FilmType;
  reviewsList: ReviewsType;
};

function HeroSection({ film }: HeroSectionProps): JSX.Element | null {
  const { title, genre, releaseDate, backgroundImage } = film;

  return (
    <div className="film-card__hero">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={title} />
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header />
      <div className="film-card__wrap">
        <div className="film-card__desc">
          <h2 className="film-card__title">{title}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{genre}</span>
            <span className="film-card__year">{releaseDate}</span>
          </p>
          <ControlButtonsList film={film} />
        </div>
      </div>
    </div>
  );
}

function TabsSection({ film, reviewsList }: TabsSectionProps): JSX.Element {
  const { director, description, starring, rating, runTime, genre, releaseDate, cover, title } = film;
  const ratingCount = calcArraySumProps(reviewsList ?? [], 'rating')?.length;

  const descriptionProps = { director, description, starring, rating, ratingCount } as FilmDescriptionType;
  const detailsProps = { director, starring, runTime, genre, releaseDate } as FilmDetailsType;


  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={cover} alt={`${title} poster`} width="218" height="327" />
        </div>
        <TabsList
          tabsList={TABS_LIST}
          descriptionProps={descriptionProps}
          detailsProps={detailsProps}
          reviewsList={reviewsList}
        />
      </div>
    </div>
  );
}

const MemoTabsSection = memo(TabsSection, (prevProps, nextProps) => (
  prevProps.film.id === nextProps.film.id
  && prevProps.reviewsList === nextProps.reviewsList
));

function FilmCard({ activeFilm }: FilmCardProps): JSX.Element | null {
  const { film, reviews } = activeFilm ?? {};
  if (!film) {
    return null;
  }

  return (
    <section className="film-card film-card--full" style={{ backgroundColor: film.backgroundColor }}>
      <HeroSection film={film} />
      <MemoTabsSection film={film} reviewsList={reviews} />
    </section>
  );

}

export default FilmCard;
