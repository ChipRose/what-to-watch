import { genreMapping } from '../../const/const';

import { groupByGenre } from '../../util/util';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { setCatalog, setGenre } from '../../store/actions';
import { Link } from 'react-router-dom';

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
  const handleClick = () => {
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
  const activeGenre = useAppSelector((state) => state.activeGenre);
  const films = useAppSelector((state) => state.films);
  const groupedFilms = groupByGenre(films);

  const genresList = Object.keys(groupedFilms) as genreListType;

  const tabs: { genre: GenreType; title: TabTitleType }[] = genresList.map((value) => ({
    title: genreMapping[value],
    genre: value,
  }));

  const onUpdate = (genre: GenreType) => {
    if (groupByGenre(films)[activeGenre]?.length) {
      dispatch(setGenre(genre));
      dispatch(setCatalog(groupedFilms[genre]));
    }
  };

  return (
    <ul className="catalog__genres-list">
      {
        tabs?.map(({ genre, title }) => (
          <GenreTab key={genre} genre={genre} title={title} onUpdate={onUpdate} isActive={genre === activeGenre} />
        ))
      }
    </ul>
  );
}

export default GenreList;
