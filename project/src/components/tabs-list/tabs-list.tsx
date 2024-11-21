import { useState } from 'react';
import { TabsType } from '../../types/tabs';

import { TabsModification } from '../../const/const';

import { Link } from 'react-router-dom';

type TabsListProps = {
  tabsList: TabsType;
  type: TabsModification.Catalog | TabsModification.Navigation;
}

type TabContentProps = {
  tabsList: TabsType;
  type: TabsModification.Catalog | TabsModification.Navigation;
}

function Tabs({ tabsList, type }: TabContentProps): JSX.Element {

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (tabId: number) => {
    if (tabsList[activeTab]) {
      setActiveTab(tabId);
    }
  };

  return (
    <>
      {
        type === TabsModification.Navigation ? (
          <nav className="film-nav film-card__nav">
            <ul className="film-nav__list">
              {
                tabsList?.map(({ id: tabId, title }) => (
                  <li
                    key={tabId}
                    className={`film-nav__item${tabId === activeTab ? ' film-nav__item--active' : ''}`}
                    onClick={() => handleClick(tabId)}
                  >
                    <Link to="#" className="film-nav__link">{title}</Link>
                  </li>
                ))
              }
            </ul>
          </nav>
        ) : (
          <ul className="catalog__genres-list">
            {
              tabsList?.map(({ id: tabId, title }) => (
                <li
                  key={tabId}
                  className={`catalog__genres-item${tabId === activeTab ? ' catalog__genres-item--active' : ''}`}
                  onClick={() => handleClick(tabId)}
                >
                  <Link to="#" className="catalog__genres-link">{title}</Link>
                </li>
              ))
            }
          </ul>
        )
      }
      {tabsList.find(({ id: componentId }) => componentId === activeTab)?.component}
    </>
  );
}

function TabsList({ tabsList, type }: TabsListProps): JSX.Element {


  return type === TabsModification.Navigation ? (
    <div className="film-card__desc">
      <Tabs type={type} tabsList={tabsList} />
    </div >
  ) : (
    <Tabs type={type} tabsList={tabsList} />
  );
}

export default TabsList;
