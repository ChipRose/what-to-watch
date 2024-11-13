import { useState } from 'react';

import { FilmFullInfo, FilmDescription } from '../../types/film';
import { FilmReviewsList } from '../../types/review';
import { filmCardTabs, TabsComponent } from '../../const/const';

import TabsList from '../tabs-list/tabs-list';
// import CardDescription from '../card-description/card-description';
import Header from '../header/header';
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
  reviewsList
}: FilmCardProps): JSX.Element {
  const ACTIVE_TAB = 0;

  const descriptionProps: FilmDescription = { director, description, starring, rating, ratingCount };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<number>(ACTIVE_TAB);

  const onTabClick = (id: number) => {
    setActiveTab(id);
  };
  const Component = TabsComponent[0].component;

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

          <div className="film-card__desc">
            <nav className="film-nav film-card__nav">
              <TabsList activeTab={activeTab} tabsList={filmCardTabs} onUpdate={onTabClick} />
            </nav>
            {
              <Component {...descriptionProps} />
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
