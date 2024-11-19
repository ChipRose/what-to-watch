
import { FilmDescription, FilmDetails, FilmFullInfo } from '../../types/film';
import { TabsType } from '../../types/tabs';
import { FilmReviewsList } from '../../types/review';

import TabsList from '../tabs-list/tabs-list';
import TabDescription from '../tab-description/tab-description';
import TabDetails from '../tab-details/tab-details';
import Header from '../header/header';
// import CardDescription from '../card-description/card-description';

type FilmCardProps = FilmFullInfo & {
  isFull: boolean;
  reviewsList: FilmReviewsList;
};

function FilmCard({
  isFull,
  reviewsList,
  ...filmProps
}: FilmCardProps): JSX.Element {
  const { hero, title, cover } = filmProps;

  const getTabsList = ({ ...film }: FilmFullInfo): TabsType => {
    const { director, description, starring, rating, ratingCount, runTime, genre, realized } = film;

    const descriptionProps: FilmDescription = { director, description, starring, rating, ratingCount };
    const detailsProps: FilmDetails = { director, starring, runTime, genre, realized };
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
    ];
    return tabsList;
  };

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
              <span className="film-card__genre">{filmProps.genre}</span>
              <span className="film-card__year">{filmProps.realized}</span>
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

          <TabsList tabsList={getTabsList({ ...filmProps })} />
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
