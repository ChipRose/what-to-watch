import { memo } from 'react';

import { TABS_LIST, EMPTY_REVIEWS } from '../../const/const';
import { calcArraySumProps } from '../../util/util';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getActiveFilmItem, getActiveReviews } from '../../store/film-data/selectors';

import Header from '../header/header';
import TabsList from '../tabs-list/tabs-list';
import ControlButtonsList from '../control-buttons-list/control-buttons-list';

import type { FilmDescriptionType, FilmDetailsType, FilmType } from '../../types/film';
import type { ReviewsType } from '../../types/review';

type HeroSectionProps = {
  film: FilmType;
};

type TabsSectionProps = {
  film: FilmType;
  descriptionProps: FilmDescriptionType;
  detailsProps: FilmDetailsType;
  reviewsList: ReviewsType;
};

const isTabsFilmEqual = (prevFilm: FilmType | null, nextFilm: FilmType | null): boolean => {
  if (!prevFilm && !nextFilm) {
    return true;
  }

  if (!prevFilm || !nextFilm) {
    return false;
  }

  return (
    prevFilm.id === nextFilm.id
  );
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

function TabsSection({ film, descriptionProps, detailsProps, reviewsList }: TabsSectionProps): JSX.Element {
  const { cover, title } = film;

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
));

function FilmCard(): JSX.Element | null {
  const activeFilm = useAppSelector(getActiveFilmItem, isTabsFilmEqual);
  const activeReviews = useAppSelector(getActiveReviews) ?? EMPTY_REVIEWS;

  if (!activeFilm) {
    return null;
  }

  const { director, description, starring, rating, runTime, genre, releaseDate } = activeFilm;
  const ratingCount = calcArraySumProps(activeReviews, 'rating')?.length;
  const descriptionProps = { director, description, starring, rating, ratingCount } as FilmDescriptionType;
  const detailsProps = { director, starring, runTime, genre, releaseDate } as FilmDetailsType;

  return (
    <section className="film-card film-card--full">
      <HeroSection film={activeFilm} />
      <MemoTabsSection film={activeFilm} descriptionProps={descriptionProps} detailsProps={detailsProps} reviewsList={activeReviews} />
    </section>
  );
}

export default FilmCard;
