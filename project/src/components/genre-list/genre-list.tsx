import { Link } from 'react-router-dom';

import { genreMapping, CatalogCount, TABS_COUNT } from '../../const/const';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { getCatalog, getGroupedFilms } from '../../store/film-data/selectors';
import { setGenre, setCatalog } from '../../store/actions';


type genreListType = Array<keyof typeof genreMapping>;
type GenreType = keyof typeof genreMapping;
type TabTitleType = typeof genreMapping[GenreType];

type GenreProps = {
  genre: GenreType;
  title: TabTitleType;
  isActive: boolean;
  onUpdate: (genre: GenreType) => void;
}

function GenreTab({ genre, title, isActive, onUpdate }: GenreProps): JSX.Element {
  const handleClick = (evt: React.MouseEvent) => {
    evt.preventDefault();
    onUpdate(genre);
  };

  return (
    <li
      key={genre}
      onClick={handleClick}
      className={`catalog__genres-item${isActive ? ' catalog__genres-item--active' : ''}`}
    >
      <Link to="/" className="catalog__genres-link">{title}</Link>
    </li>
  );
}

function GenreList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { activeGenre } = useAppSelector(getCatalog) || 'all';
  const groupedFilms = useAppSelector(getGroupedFilms) || {};

  const genresList = Object.keys(groupedFilms) as genreListType;

  const tabs: { genre: GenreType; title: TabTitleType }[] = genresList.map((value) => ({
    title: genreMapping[value],
    genre: value,
  }));

  const tabsList = tabs?.length > TABS_COUNT ? tabs.slice(0, TABS_COUNT) : tabs;

  const onUpdate = (genre: GenreType) => {
    if (genre === activeGenre) {
      return;
    }

    if (groupedFilms[activeGenre]?.length) {
      dispatch(setGenre(genre));
      dispatch(setCatalog(CatalogCount.Init));
    }
  };

  return (
    <ul className="catalog__genres-list">
      {
        tabsList?.map(({ genre, title }) => (
          <GenreTab key={genre} genre={genre} title={title} onUpdate={onUpdate} isActive={genre === activeGenre} />
        ))
      }
    </ul>
  );
}

export default GenreList;
