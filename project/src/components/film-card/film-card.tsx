
import { useAppSelector } from '../../hooks/use-app-selector';

import type { FilmDescriptionType, FilmDetailsType, FilmType } from '../../types/film';
import type { TabsType } from '../../types/tabs';
import type { ReviewsType } from '../../types/review';

import { calcArraySumProps } from '../../util/util';

import Header from '../header/header';
import TabsList from '../tabs-list/tabs-list';
import TabDescription from '../tab-description/tab-description';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';
import ControlButtonsList from '../control-buttons-list/control-buttons-list';


type FilmCardProps = {
  isFull: boolean;
};

type TabsListProps = FilmType & {
  reviewsList: ReviewsType;
}

const getTabsList = ({ reviewsList, ...film }: TabsListProps): TabsType => {
  const { director, description, starring, runTime, genre, realized, rating } = film || {};
  const ratingCount = calcArraySumProps(reviewsList, 'rating').lenght;
  const descriptionProps: FilmDescriptionType = { director, description, starring, rating, ratingCount };
  const detailsProps: FilmDetailsType = { director, starring, runTime, genre, realized };
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

function FilmCard({
  isFull,
}: FilmCardProps): JSX.Element | null {

  const activeFilm = useAppSelector((state) => state.activeFilm.film);
  const activeReviews = useAppSelector((state) => state.activeFilm.reviews);

  const { title, cover, genre, realized, backgroundColor } = activeFilm || {};

  const mainClass = `film-card${isFull ? ' film-card--full' : ''}`;

  return activeFilm ? (
    <section className={mainClass} style={{ background: backgroundColor }}>
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={activeFilm.backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__desc">
            <h2 className="film-card__title">{title}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{realized}</span>
            </p>
            <ControlButtonsList/>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={cover} alt={title} width="218" height="327" />
          </div>

          <TabsList tabsList={getTabsList({ reviewsList: activeReviews, ...activeFilm })} />
        </div>
      </div>
    </section>
  ) : null;
}

export default FilmCard;
