import { useCallback } from 'react';
import { Genre } from '../../const/const';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { getPromoFilm, getGroupedFilms } from '../../store/film-data/selectors';
import { loadMoreToCatalog } from '../../store/film-process/film-process';
import { getCatalog } from '../../store/film-process/selectors';

import { setCatalogData } from '../../store/film-process/film-process';

import Footer from '../../components/footer/footer';
import PromoCard from '../../components/promo-card/promo-card';
import GenreCatalog from '../../components/genre-catalog/genre-catalog';

import type { CatalogDataType } from '../../types/film';

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const groupedFilms = useAppSelector(getGroupedFilms);
  const catalogFilms = useAppSelector(getCatalog).films;
  const activeGenre = useAppSelector(getCatalog).activeGenre;
  const activeFilmsList = useAppSelector(getGroupedFilms)?.[Genre.All] ?? null;
  const isShowLoadMoreButton = !useAppSelector(getCatalog).isAllShown;

  const handleShowMoreButtonClick = useCallback(() => {
    dispatch(loadMoreToCatalog(activeFilmsList));
  }, [dispatch, activeFilmsList]);

  const handleGenreChange = useCallback((catalogData: CatalogDataType) => {
    dispatch(setCatalogData(catalogData));
  }, [dispatch]);

  return (
    <>
      <PromoCard film={promoFilm} />

      <div className='page-content'>
        <GenreCatalog catalogFilms={catalogFilms} isShowLoadMoreButton={isShowLoadMoreButton} groupedFilms={groupedFilms} activeGenre={activeGenre} onLoadMore={handleShowMoreButtonClick} onGenreChange={handleGenreChange} />

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
