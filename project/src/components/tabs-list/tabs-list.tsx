import { useEffect, useState } from 'react';
import { TabsType } from '../../types/tabs';

import { Link } from 'react-router-dom';

type TabsListProps = {
  tabsList: TabsType;
}

function TabsList({ tabsList }: TabsListProps): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (id: number) => {
    if (tabsList[activeTab]) {
      setActiveTab(id);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    console.log(activeTab);
  }, [activeTab]);

  return (
    <div className="film-card__desc">
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
      {tabsList.find(({ id: componentId }) => componentId === activeTab)?.component}
    </div >
  );
}

export default TabsList;
