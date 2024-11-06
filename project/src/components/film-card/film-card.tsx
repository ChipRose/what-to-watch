import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Film, FilmDescription } from '../../types/film';
import { FilmReviewsList } from '../../types/review';

import Logo from '../logo/logo';
import CardDescription from '../card-description/card-description';

type FilmCardProps = Film & {
  isFull: boolean;
  reviewsList: FilmReviewsList;
};

type TabsListProps = {
  activeTab: number;
  onUpdate: (id: number) => void;
}

const tabs = [
  {
    id: 0, title: 'Overview'
  },
  {
    id: 1, title: 'Details', component: (descriptionProps: FilmDescription): JSX.Element => <CardDescription {...descriptionProps} />
  },
  {
    id: 2, title: 'Reviews'
  },
];

function TabsList({ activeTab, onUpdate }: TabsListProps): JSX.Element {

  const handleClick = (id: number) => {
    onUpdate(id);
  };

  return (
    <ul className="film-nav__list">
      {
        tabs.map(({ id, title }) => (
          <li
            key={id}
            className={`film-nav__item${id === activeTab ? ' film-nav__item--active' : ''}`}
            onClick={() => handleClick(id)}
          >
            <Link to="#" className="film-nav__link">{title}</Link>
          </li>
        ))
      }
    </ul>
  );
}

function FilmCard({
  isFull,
  poster,
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

  const mainClass = `film-card ${isFull ? ' film-card--full' : ''}`;

  return (
    <section className={mainClass}>
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={hero} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <ul className="user-block">
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </li>
            <li className="user-block__item">
              <a className="user-block__link" href="/">Sign out</a>
            </li>
          </ul>
        </header>

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
            <img src={poster} alt={title} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <nav className="film-nav film-card__nav">
              <TabsList activeTab={activeTab} onUpdate={onTabClick} />
            </nav>
            {
              // tabs?.find(({ id: tabId }) => tabId === activeTab)?.component({director, description, starring, rating, ratingCount} )
            }
            <CardDescription {...descriptionProps} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCard;
