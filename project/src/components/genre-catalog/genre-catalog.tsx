import { memo } from 'react';

import withCatalog from '../../hocs/with-catalog/with-catalog';
import GenreList from '../genre-list/genre-list';
import Catalog from '../catalog/catalog';
import ShowMoreButton from '../buttons/show-more-button/show-more-button';

import type { CatalogDataType, GenreNameType } from '../../types/film';
import type { GenreListType } from '../../types/genre';

type GenreCatalogProps = {
  catalog: CatalogDataType;
  genresList: GenreListType;
  onLoadMore: () => void;
  onGenreChange: (genre: GenreNameType) => void;
}

const CatalogWrapped = withCatalog(Catalog);

function GenreCatalog({ catalog, genresList, onLoadMore, onGenreChange }: GenreCatalogProps): JSX.Element | null {
  const { films, activeGenre, isAllShown } = catalog;

  const handleShowMoreButtonClick = () => {
    onLoadMore();
  };

  const handleGenreChange = (genre: GenreNameType) => {
    onGenreChange(genre);
  };

  return films?.length ? (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>

      <GenreList genresList={genresList} activeGenre={activeGenre} onUpdate={handleGenreChange} />

      <CatalogWrapped filmsList={films} />

      {
        !isAllShown ? (
          <div className='catalog__more'>
            <ShowMoreButton onUpdate={handleShowMoreButtonClick} />
          </div>
        ) : null
      }
    </section>
  ) : null;
}

export default memo(GenreCatalog);
