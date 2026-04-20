import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { generatePath } from 'react-router-dom';

import { AppRoute } from '../../const/const';
import { makeTestFilm } from '../../util/mocks';
import { adaptFilmToApp } from '../../util/util-adapt-data';

import FilmCard from './film-card';
import HistoryRouter from '../history-route/history-route';

jest.mock('../header/header', () => () => <div>Header Mock</div>);
jest.mock('../control-buttons-list/control-buttons-list', () => () => <div>Buttons Mock</div>);
jest.mock('../tabs-list/tabs-list', () => () => <div>Tabs Mock</div>);

const testHistory = createMemoryHistory();

const mockAdaptedFilm = adaptFilmToApp(makeTestFilm());
const mockActiveFilm = {
  film: mockAdaptedFilm,
  reviews: [],
  similarFilms: [],
};

const testComponent = (
  <HistoryRouter history={testHistory}>
    <FilmCard activeFilm={mockActiveFilm} />
  </HistoryRouter>
);

describe('Component: FilmCard', () => {
  it('should render correctly', () => {
    testHistory.push(generatePath(AppRoute.Film, { id: String(mockAdaptedFilm?.id ?? '') }));

    render(testComponent);

    expect(screen.getByText(/Header Mock/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockAdaptedFilm?.title ?? '', 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Buttons Mock/i)).toBeInTheDocument();
    expect(screen.getByText(/Tabs Mock/i)).toBeInTheDocument();
  });
});
