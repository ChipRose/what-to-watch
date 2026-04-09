import { genreMapping, TABS_COUNT, CatalogCount } from '../../const/const';
import { getCatalogData } from '../../util/util';

import type { GenreNameType, GroupedFilmsType, CatalogDataType } from '../../types/film';

type genreListType = Array<keyof typeof genreMapping>;
type GenreType = keyof typeof genreMapping;
type TabTitleType = typeof genreMapping[GenreType];

type GenreProps = {
  genre: GenreType;
  title: TabTitleType;
  isActive: boolean;
  onUpdate: (genre: GenreType) => void;
}

type GenreListProps = {
  genresList: genreListType;
  activeGenre: GenreNameType;
  groupedFilms: GroupedFilmsType | null;
  onUpdate: (catalogData: CatalogDataType) => void;
}

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

function GenreList({ genresList, activeGenre, groupedFilms, onUpdate }: GenreListProps): JSX.Element {
  const tabs: { genre: GenreType; title: TabTitleType }[] = genresList.map((value) => ({
    title: genreMapping[value],
    genre: value,
  }));

  const tabsList = tabs?.length > TABS_COUNT ? tabs.slice(0, TABS_COUNT) : tabs;

  const onGenreUpdate = (genre: GenreType) => {
    if (genre === activeGenre) {
      return;
    }

    if (groupedFilms && groupedFilms[genre]?.length) {
      const catalogData = getCatalogData(groupedFilms[genre], genre, CatalogCount.Init);
      onUpdate(catalogData);
    }
  };

  return (
    <ul className="catalog__genres-list">
      {
        tabsList?.map(({ genre, title }) => (
          <GenreTab key={genre} genre={genre} title={title} onUpdate={onGenreUpdate} isActive={genre.toLowerCase() === activeGenre.toLowerCase()} />
        ))
      }
    </ul>
  );
}

export default GenreList;
