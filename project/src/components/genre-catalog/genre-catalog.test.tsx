import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { Genre } from '../../const/const';

import { makeTestFilms, makeTestGenresList } from '../../util/mocks';
import { adaptFilmsDataToApp } from '../../util/util-adapt-data';

import GenreCatalog from './genre-catalog';
import HistoryRouter from '../history-route/history-route';

jest.mock('../genre-list/genre-list', () => () => <div>GenreList Mock</div>);
jest.mock('../catalog/catalog', () => () => <div>Catalog Mock</div>);
jest.mock('../buttons/show-more-button/show-more-button', () => () => <div>ShowMore Mock</div>);
const onLoadMore = jest.fn();
const onGenreChange = jest.fn();

const mockAdaptedFilms = adaptFilmsDataToApp(makeTestFilms());
const mockGenresList = makeTestGenresList();

const testCatalog = {
  films: mockAdaptedFilms ?? [],
  activeGenre: Genre.All,
  count: 8,
  isAllShown: false,
};

const testHistory = createMemoryHistory();

const makeTestComponent = (isAllShown = false) => (
  <HistoryRouter history={testHistory}>
    <GenreCatalog
      catalog={{ ...testCatalog, isAllShown }}
      genresList={mockGenresList}
      onLoadMore={onLoadMore}
      onGenreChange={onGenreChange}
    />
  </HistoryRouter>
);

describe('Component: GenreCatalog', () => {

  it('should render correctly when show-more is available', () => {
    render(makeTestComponent(false));

    expect(screen.getByText(/^Catalog$/i)).toBeInTheDocument();
    expect(screen.getByText(/^GenreList Mock$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Catalog Mock$/i)).toBeInTheDocument();
    expect(screen.getByText(/^ShowMore Mock$/i)).toBeInTheDocument();
  });

  it('should hide show-more when all films are shown', () => {
    render(makeTestComponent(true));

    expect(screen.queryByText(/^ShowMore Mock$/i)).not.toBeInTheDocument();
  });
});
