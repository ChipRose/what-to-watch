import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';

import { NameSpace, AppRoute, APIRoute, AuthorizationStatus, Genre, CatalogCount } from '../../const/const';
import { createApi } from '../../services/api';
import { makeTestFilm, makeTestFilms } from '../../util/mocks';
import { adaptFilmToApp, adaptFilmsDataToApp } from '../../util/util-adapt-data';
import HistoryRouter from '../../components/history-route/history-route';

import MyListScreen from './my-list-screen';

import type { StateType } from '../../types/state';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);

const mockAPI = new MockAdapter(api);

const mockFilm = makeTestFilm();
const mockFilms = makeTestFilms();
const promoFilm = adaptFilmToApp(mockFilm);
const films = adaptFilmsDataToApp(mockFilms);
const groupedFilms = { [Genre.All]: films ?? [] };

const testStore = mockStore({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userInfo: { avatar: null } },
  [NameSpace.Data]: {
    isDataLoaded: true,
    films,
    promoFilm,
    myList: films,
    groupedFilms,
    activeFilm: {
      film: promoFilm,
      reviews: [],
      similarFilms: [],
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
        <Route path={AppRoute.MyList} element={<MyListScreen />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: MyListScreen', () => {
  beforeEach(() => {
    mockAPI.resetHandlers();
    mockAPI.onGet(APIRoute.Favorite).reply(200, mockFilms);
  });

  afterEach(() => {
    mockAPI.resetHandlers();
  });

  it('should render correctly', () => {
    testHistory.push(AppRoute.MyList);
    render(testApp);

    expect(screen.getByRole('heading', { name: /My list/i })).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
