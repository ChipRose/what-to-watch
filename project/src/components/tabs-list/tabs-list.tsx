import { Tabs } from '../../types/tabs';
import { Link } from 'react-router-dom';

type TabsListProps = {
  activeTab: number;
  tabsList: Tabs;
  onUpdate: (id: number) => void;
}

function TabsList({ activeTab, tabsList, onUpdate }: TabsListProps): JSX.Element {
  const handleClick = (id: number) => {
    onUpdate(id);
  };

  return (
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
  );
}

export default TabsList;
