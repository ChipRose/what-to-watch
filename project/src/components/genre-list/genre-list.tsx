import { genreMapping, TABS_COUNT } from '../../const/const';

import type { GenreNameType } from '../../types/film';
import type { GenreListType, GenreType, GenreTitleType } from '../../types/genre';

type GenreProps = {
  genre: GenreType;
  title: GenreTitleType;
  isActive: boolean;
  onUpdate: (genre: GenreType) => void;
}

type GenreListProps = {
  genresList: GenreListType;
  activeGenre: GenreNameType;
  onUpdate: (genre: GenreNameType) => void;
}

type GenreTabProps = Array<{
  genre: GenreType;
  title: GenreTitleType;
}>

function GenreTab({ genre, title, isActive, onUpdate }: GenreProps): JSX.Element {
  const handleClick = () => {
    onUpdate(genre);
  };

  return (
    <li
      key={genre}
      className={`catalog__genres-item${isActive ? ' catalog__genres-item--active' : ''}`}
    >
      <button type="button" className="catalog__genres-link" onClick={handleClick}>{title}</button>
    </li>
  );
}

function GenreList({ genresList, activeGenre, onUpdate }: GenreListProps): JSX.Element {
  const tabs: GenreTabProps = genresList.map((value) => ({
    title: genreMapping[value],
    genre: value,
  }));

  const tabsList: GenreTabProps = tabs.length > TABS_COUNT ? tabs.slice(0, TABS_COUNT) : tabs;

  const onGenreUpdate = (genre: GenreType) => {
    if (genre === activeGenre) {
      return;
    }

    onUpdate(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {
        tabsList.map((tab) => (
          <GenreTab key={tab.genre} genre={tab.genre} title={tab.title} onUpdate={onGenreUpdate} isActive={tab.genre === activeGenre} />
        ))
      }
    </ul>
  );
}

export default GenreList;
