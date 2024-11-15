
import { FilmFullInfo, FilmDetails, FilmDescription } from '../../types/film';
import { FilmReviewsList } from '../../types/review';

import TabsList from '../tabs-list/tabs-list';
import TabDescription from '../tab-description/tab-description';
import TabDetails from '../tab-details/tab-details';
import Header from '../header/header';
import { FilmTabs } from '../../types/tabs';
// import CardDescription from '../card-description/card-description';

type FilmCardProps = FilmFullInfo & {
  isFull: boolean;
  reviewsList: FilmReviewsList;
};

function FilmCard({
  isFull,
  cover,
  hero,
  title,
  genre,
  realized,
  director,
  description,
  starring,
  rating,
  ratingCount,
  runTime,
  reviewsList
}: FilmCardProps): JSX.Element {
  // eslint-disable-next-line
  console.log({ director, starring, runTime, genre, realized });
  const filmCardTabs: FilmTabs = [
    {
      id: 0,
      title: 'Overview',
      props: { director, description, starring, rating, ratingCount } as FilmDescription,
      component: TabDescription,
    },
    {
      id: 1,
      title: 'Details',
      props: { director, starring, runTime, genre, realized } as FilmDetails,
      component: TabDetails,
    },
    // {
    //   id: 2,
    //   title: 'Reviews'
    // },
  ];

  const mainClass = `film-card ${isFull ? ' film-card--full' : ''}`;

  return (
    <section className={mainClass}>
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={hero} alt={title} />
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

            <div className="film-card__buttons">
              <button className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list film-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn film-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={cover} alt={title} width="218" height="327" />
          </div>

          <TabsList tabsList={filmCardTabs} />
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
