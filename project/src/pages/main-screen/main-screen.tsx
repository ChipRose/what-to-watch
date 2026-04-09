import { useCallback, useMemo } from 'react';
import { Genre, CatalogCount } from '../../const/const';
import { getCatalogData } from '../../util/util';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { getPromoFilm, getGroupedFilms } from '../../store/film-data/selectors';
import { loadMoreToCatalog } from '../../store/film-process/film-process';
import { getCatalog } from '../../store/film-process/selectors';
import { catalogInitialState } from '../../const/const';

import { setCatalogData } from '../../store/film-process/film-process';

import Footer from '../../components/footer/footer';
import PromoCard from '../../components/promo-card/promo-card';
import GenreCatalog from '../../components/genre-catalog/genre-catalog';

import type { GenreNameType } from '../../types/film';
import type { GenreListType } from '../../types/genre';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const groupedFilms = useAppSelector(getGroupedFilms);
  const catalog = useAppSelector(getCatalog);
  const activeFilmsList = useAppSelector(getGroupedFilms)?.[Genre.All] ?? null;
  const genresList = useMemo(
    () => (groupedFilms ? Object.keys(groupedFilms) as GenreListType : []),
    [groupedFilms]
  );

  const handleShowMoreButtonClick = useCallback(() => {
    dispatch(loadMoreToCatalog(activeFilmsList));
  }, [dispatch, activeFilmsList]);

  const handleGenreChange = useCallback((genre: GenreNameType) => {
    if (groupedFilms && groupedFilms[genre]?.length) {
      const catalogData = getCatalogData(groupedFilms[genre], genre, CatalogCount.Init);
      dispatch(setCatalogData(catalogData));
    } else {
      dispatch(setCatalogData(catalogInitialState));
    }
  }, [dispatch, groupedFilms, catalog.activeGenre]);

  return (
    <>
      <PromoCard film={promoFilm} />

      <div className='page-content'>
        <GenreCatalog catalog={catalog} genresList={genresList} onLoadMore={handleShowMoreButtonClick} onGenreChange={handleGenreChange} />

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
