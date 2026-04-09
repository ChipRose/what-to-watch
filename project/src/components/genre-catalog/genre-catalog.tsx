import { memo } from 'react';

import withCatalog from '../../hocs/with-catalog/with-catalog';
import GenreList from '../genre-list/genre-list';
import Catalog from '../catalog/catalog';
import ShowMoreButton from '../buttons/show-more-button/show-more-button';

import type { FilmsType, GroupedFilmsType, GenreNameType, CatalogDataType } from '../../types/film';
import type { GenreListType } from '../../types/genre';

type GenreCatalogProps = {
  catalogFilms: FilmsType | null;
  groupedFilms: GroupedFilmsType | null;
  activeGenre: GenreNameType;
  isShowLoadMoreButton: boolean;
  onLoadMore: () => void;
  onGenreChange: (catalogData: CatalogDataType) => void;
}

const CatalogWrapped = withCatalog(Catalog);

function GenreCatalog({ catalogFilms, isShowLoadMoreButton, groupedFilms, activeGenre, onLoadMore, onGenreChange }: GenreCatalogProps): JSX.Element | null {
  const genresList = groupedFilms ? Object.keys(groupedFilms) as GenreListType : [];

  const handleShowMoreButtonClick = () => {
    onLoadMore();
  };

  const handleGenreChange = (catalogData: CatalogDataType) => {
    onGenreChange(catalogData);
  };

  return catalogFilms?.length ? (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>

      <GenreList genresList={genresList} activeGenre={activeGenre} groupedFilms={groupedFilms ?? null} onUpdate={handleGenreChange} />

      <CatalogWrapped filmsList={catalogFilms} />

      {
        isShowLoadMoreButton ? (
          <div className='catalog__more'>
            <ShowMoreButton onUpdate={handleShowMoreButtonClick} />
          </div>
        ) : null
      }
    </section>
  ) : null;
}

export default memo(GenreCatalog);
