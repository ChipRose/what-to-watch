import { memo } from 'react';

import withCatalog from '../../hocs/with-catalog/with-catalog';
import GenreList from '../genre-list/genre-list';
import Catalog from '../catalog/catalog';
import ShowMoreButton from '../buttons/show-more-button/show-more-button';

import type { FilmsType, GenreNameType } from '../../types/film';
import type { GenreListType } from '../../types/genre';

type GenreCatalogProps = {
  catalogFilms: FilmsType | null;
  genresList: GenreListType;
  activeGenre: GenreNameType;
  isShowLoadMoreButton: boolean;
  onLoadMore: () => void;
  onGenreChange: (genre: GenreNameType) => void;
}

const CatalogWrapped = withCatalog(Catalog);

function GenreCatalog({ catalogFilms, isShowLoadMoreButton, genresList, activeGenre, onLoadMore, onGenreChange }: GenreCatalogProps): JSX.Element | null {

  const handleShowMoreButtonClick = () => {
    onLoadMore();
  };

  const handleGenreChange = (genre: GenreNameType) => {
    onGenreChange(genre);
  };

  return catalogFilms?.length ? (
    <section className='catalog'>
      <h2 className='catalog__title visually-hidden'>Catalog</h2>

      <GenreList genresList={genresList} activeGenre={activeGenre} onUpdate={handleGenreChange} />

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
