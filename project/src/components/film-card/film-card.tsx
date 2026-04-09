import { memo, useMemo } from 'react';

import { calcArraySumProps } from '../../util/util';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getActiveFilm } from '../../store/film-data/selectors';

import Header from '../header/header';
import TabsList from '../tabs-list/tabs-list';
import TabDescription from '../tab-description/tab-description';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';
import ControlButtonsList from '../control-buttons-list/control-buttons-list';

import type { FilmDescriptionType, FilmDetailsType, FilmType } from '../../types/film';
import type { TabsType } from '../../types/tabs';
import type { ReviewsType } from '../../types/review';

type TabsListProps = FilmType & {
  reviewsList: ReviewsType;
};

type HeroSectionProps = {
  film: FilmType;
};

type TabsSectionProps = {
  cover: string;
  title: string;
  tabsList: TabsType;
};

const getTabsList = ({ reviewsList, ...film }: TabsListProps): TabsType => {
  const { director, description, starring, runTime, genre, releaseDate, rating } = film || {};
  const ratingCount = calcArraySumProps(reviewsList, 'rating')?.length;
  const descriptionProps: FilmDescriptionType = { director, description, starring, rating, ratingCount };
  const detailsProps: FilmDetailsType = { director, starring, runTime, genre, releaseDate };
  const reviewProps: ReviewsType = reviewsList;

  const tabsList: TabsType = [
    {
      id: 0,
      title: 'Overview',
      component: <TabDescription {...descriptionProps} />,
    },
    {
      id: 1,
      title: 'Details',
      component: <TabDetails {...detailsProps} />,
    },
    {
      id: 2,
      title: 'Reviews',
      component: <TabReviews reviewsList={reviewProps} />,
    },
  ];
  return tabsList;
};

function HeroSection({ film }: HeroSectionProps): JSX.Element {
  const { title, genre, releaseDate, backgroundColor, backgroundImage } = film;

  return (
    <section className="film-card" style={{ background: backgroundColor }}>
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
    </section>
  );
}

const MemoHeroSection = memo(HeroSection, (prevProps, nextProps) => (
  prevProps.film.id === nextProps.film.id &&
  prevProps.film.isFavorite === nextProps.film.isFavorite
));

function TabsSection({ cover, title, tabsList }: TabsSectionProps): JSX.Element {
  return (
    <div className="film-card__wrap film-card__translate-top">
      <div className="film-card__info">
        <div className="film-card__poster film-card__poster--big">
          <img src={cover} alt={title} width="218" height="327" />
        </div>

        <TabsList tabsList={tabsList} />
      </div>
    </div>
  );
}

function FilmCard(): JSX.Element | null {

  const activeFilm = useAppSelector(getActiveFilm).film;
  const activeReviews = useAppSelector(getActiveFilm).reviews ?? [];
  const reviewsKey = activeReviews.map((review) => review.id).join('|');
  const tabsList = useMemo(
    () => (activeFilm ? getTabsList({ reviewsList: activeReviews, ...activeFilm }) : []),
    [
      activeFilm?.id,
      reviewsKey,
    ]
  );

  if (!activeFilm) {
    return null;
  }

  const { title, cover } = activeFilm;

  return (
    <>
      <MemoHeroSection film={activeFilm} />
      <TabsSection cover={cover} title={title} tabsList={tabsList} />
    </>
  );
}

export default FilmCard;
