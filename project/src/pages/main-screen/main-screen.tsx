import { Genre } from '../../const/const';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';

import { getPromoFilm, getGroupedFilms } from '../../store/film-data/selectors';
import { loadMoreToCatalog } from '../../store/film-process/film-process';
import { getCatalog } from '../../store/film-process/selectors';

import withCatalog from '../../hocs/with-catalog/with-catalog';
import Footer from '../../components/footer/footer';
import GenreList from '../../components/genre-list/genre-list';
import Catalog from '../../components/catalog/catalog';
import ShowMoreButton from '../../components/buttons/show-more-button/show-more-button';
import PromoSection from '../../components/promo-section/promo-section';

const CatalogWrapped = withCatalog(Catalog);

function MainScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const catalogFilms = useAppSelector(getCatalog).films;
  const activeFilmsList = useAppSelector(getGroupedFilms)?.[Genre.All] ?? null;
  const isShowLoadMoreButton = !useAppSelector(getCatalog).isAllShown;

  const handleShowMoreButtonClick = () => {
    dispatch(loadMoreToCatalog(activeFilmsList));
  };

  return (
    <>
      <PromoSection film={promoFilm} />

      <div className='page-content'>
        <section className='catalog'>
          <h2 className='catalog__title visually-hidden'>Catalog</h2>

          <GenreList />

          {catalogFilms?.length ? (
            <CatalogWrapped filmsList={catalogFilms} />
          ) : null}

          {
            isShowLoadMoreButton ? (
              <div className='catalog__more'>
                <ShowMoreButton onUpdate={handleShowMoreButtonClick} />
              </div>
            ) : null
          }
        </section>

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
