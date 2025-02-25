import { useState } from 'react';
import { Link } from 'react-router-dom';

import { TabsType } from '../../types/tabs';

type TabsListProps = {
  tabsList: TabsType;
}

type TabContentProps = {
  tabsList: TabsType;
}

function Tabs({ tabsList }: TabContentProps): JSX.Element {

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (tabId: number) => {
    if (tabsList[tabId]) {
      setActiveTab(tabId);
    }
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
                  onClick={() => handleClick(tabId)}
                >
                  <Link to="#" className="film-nav__link">{title}</Link>
                </li>
              ))
            }
          </ul>
        </nav>
      }
      {tabsList.find(({ id: componentId }) => componentId === activeTab)?.component}
    </>
  );
}

function TabsList({ tabsList }: TabsListProps): JSX.Element {
  return (
    <div className="film-card__desc">
      <Tabs tabsList={tabsList} />
    </div >
  );
}

export default TabsList;
