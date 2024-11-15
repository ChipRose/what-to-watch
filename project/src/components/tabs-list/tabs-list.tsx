import { useEffect, useState } from 'react';
import { FilmTabs } from '../../types/tabs';
import { Link } from 'react-router-dom';

type TabsListProps = {
  tabsList: FilmTabs;
}

function TabsList({ tabsList }: TabsListProps): JSX.Element {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleClick = (id: number) => {
    if (tabsList[activeTab]) {
      setActiveTab(id);
    }
  };

  const ActiveTab = tabsList.find(({ id: tabId }) => tabId === activeTab);
  const ActiveComponent = ActiveTab ? ActiveTab.component : tabsList[0].component;
  const activeProps = ActiveTab ? ActiveTab.props : tabsList[0].props;

  // eslint-disable-next-line
  console.log(ActiveComponent, activeProps);

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
      <ActiveComponent {...activeProps} />
    </div >
  );
}

export default TabsList;
