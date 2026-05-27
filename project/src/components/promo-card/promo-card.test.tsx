import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { AppRoute } from '../../const/const';
import { makeTestFilm } from '../../util/mocks';
import { adaptFilmToApp } from '../../util/util-adapt-data';

import PromoCard from './promo-card';
import HistoryRouter from '../history-route/history-route';

jest.mock('../header/header', () => function HeaderMock() {
  return <div>Header Mock</div>;
});
jest.mock('../control-buttons-list/control-buttons-list', () => function ControlButtonsListMock() {
  return <div>Buttons Mock</div>;
});

const testHistory = createMemoryHistory();
const mockAdaptedFilm = adaptFilmToApp(makeTestFilm());

const testComponent = (
  <HistoryRouter history={testHistory}>
    <PromoCard film={mockAdaptedFilm} />
  </HistoryRouter>
);

describe('Component: PromoCard', () => {
  it('should render correctly', () => {
    testHistory.push(AppRoute.Main);
    render(testComponent);

    expect(screen.getByText(/Header Mock/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(mockAdaptedFilm?.title ?? '', 'i'))).toBeInTheDocument();
    expect(screen.getByText(/Buttons Mock/i)).toBeInTheDocument();
  });
});
