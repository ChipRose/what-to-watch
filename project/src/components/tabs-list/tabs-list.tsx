import { useState } from 'react';

import type { TabsType } from '../../types/tabs';
import type { ButtonEvent } from '../../types/form';

type TabsListProps = {
  tabsList: TabsType;
}

type TabContentProps = {
  tabsList: TabsType;
}

function Tabs({ tabsList }: TabContentProps): JSX.Element {

  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (evt: ButtonEvent) => {
    const tabId = Number(evt.currentTarget.id);
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
                >
                  <button type="button" className="film-nav__link" id={tabId.toString()} onClick={handleClick}>{title}</button>
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
