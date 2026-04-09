import { useState, memo } from 'react';

import TabDescription from '../tab-description/tab-description';
import TabDetails from '../tab-details/tab-details';
import TabReviews from '../tab-reviews/tab-reviews';

import type { TabsType } from '../../types/tabs';
import type { ButtonEvent } from '../../types/form';
import type { FilmDescriptionType, FilmDetailsType } from '../../types/film';
import type { ReviewsType } from '../../types/review';

type TabsListProps = {
  tabsList: TabsType;
  descriptionProps: FilmDescriptionType;
  detailsProps: FilmDetailsType;
  reviewsList: ReviewsType;
};

type TabContentProps = {
  tabsList: TabsType;
  descriptionProps: FilmDescriptionType;
  detailsProps: FilmDetailsType;
  reviewsList: ReviewsType;
};

function Tabs({ tabsList, descriptionProps, detailsProps, reviewsList }: TabContentProps): JSX.Element {

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (evt: ButtonEvent) => {
    const tabId = Number(evt.currentTarget.id);
    if (tabsList[tabId]) {
      setActiveTab(tabId);
    }
  };

  const renderActiveTab = () => {
    if (activeTab === 0) {
      return <TabDescription {...descriptionProps} />;
    }

    if (activeTab === 1) {
      return <TabDetails {...detailsProps} />;
    }

    return <TabReviews reviewsList={reviewsList} />;
  };

  return (
    <>
      {
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            {
              tabsList?.map(({ id: tabId, title }) => (
                <li
                  key={tabId}
                  className={`film-nav__item${tabId === activeTab ? ' film-nav__item--active' : ''}`}
                >
                  <button type="button" className="film-nav__link" id={tabId.toString()} onClick={handleClick}>{title}</button>
                </li>
              ))
            }
          </ul>
        </nav>
      }
      {renderActiveTab()}
    </>
  );
}

function TabsList({ tabsList, descriptionProps, detailsProps, reviewsList }: TabsListProps): JSX.Element {
  return (
    <div className="film-card__desc">
      <Tabs tabsList={tabsList} descriptionProps={descriptionProps} detailsProps={detailsProps} reviewsList={reviewsList} />
    </div >
  );
}

export default memo(TabsList);
