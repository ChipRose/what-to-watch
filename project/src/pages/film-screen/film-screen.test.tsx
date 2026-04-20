import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Routes, Route, generatePath } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';

import { NameSpace, AppRoute, AuthorizationStatus, Genre, CatalogCount } from '../../const/const';
import { createApi } from '../../services/api';
import { makeTestFilm, makeTestFilms } from '../../util/mocks';
import { adaptFilmToApp, adaptFilmsDataToApp } from '../../util/util-adapt-data';
import HistoryRouter from '../../components/history-route/history-route';

import FilmScreen from './film-screen';

import type { StateType } from '../../types/state';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);

const mockFilm = makeTestFilm();
const mockFilms = makeTestFilms();
const activeFilm = adaptFilmToApp(mockFilm);
const films = adaptFilmsDataToApp(mockFilms);
const groupedFilms = { [Genre.All]: films ?? [] };

const testStore = mockStore({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userInfo: { avatar: null } },
  [NameSpace.Data]: {
    isDataLoaded: true,
    films,
    promoFilm: activeFilm,
    myList: films,
    groupedFilms,
    activeFilm: {
      film: activeFilm,
      reviews: [],
      similarFilms: films,
    },
  },
  [NameSpace.Film]: {
    catalog: {
      films: films ?? [],
      activeGenre: Genre.All,
      count: CatalogCount.Init,
      isAllShown: false,
    }
  },
});

const testHistory = createMemoryHistory();

const testApp = (
  <Provider store={testStore}>
    <HistoryRouter history={testHistory}>
      <Routes>
        <Route path={AppRoute.Film} element={<FilmScreen />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: FilmScreen', () => {
  it('should render correctly', () => {
    testHistory.push(generatePath(AppRoute.Film, { id: String(activeFilm?.id ?? '') }));
    render(testApp);

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(activeFilm?.title ?? '', 'i'))).toBeInTheDocument();
  });
});
