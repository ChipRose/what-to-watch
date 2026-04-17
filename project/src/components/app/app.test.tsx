import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { generatePath } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';
import MockAdapter from 'axios-mock-adapter';

import { AuthorizationStatus, NameSpace, APIRoute, AppRoute } from '../../const/const';
import { createApi } from '../../services/api';

import { makeTestFilm, makeTestFilms } from '../../util/mocks';
import { adaptFilmToApp, adaptFilmsDataToApp } from '../../util/util-adapt-data';
import HistoryRouter from '../history-route/history-route';

import type { FilmDataType, StateType } from '../../types/state';

import App from './app';

const mockFilm = makeTestFilm();
const mockFilms = makeTestFilms();
const mockAdaptedFilm = adaptFilmToApp(mockFilm);
const mockAdaptedFilms = adaptFilmsDataToApp(mockFilms);
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);

const mockAPI = new MockAdapter(api);

const testStore = mockStore({

  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userInfo: { avatar: null } },
  [NameSpace.Data]: {
    isDataLoaded: true,
    films: mockAdaptedFilms,
    promoFilm: mockAdaptedFilm,
    myList: null,
    groupedFilms: null,
    activeFilm: {
      film: mockAdaptedFilm,
      reviews: [],
      similarFilms: [],
    },
  },
  [NameSpace.Film]: { catalog: {films: mockAdaptedFilms} },

});

const testHistory = createMemoryHistory();


const testApp = (
  <Provider store={testStore}>
    <HistoryRouter history={testHistory}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  beforeEach(() => {
    mockAPI.resetHandlers();

    mockAPI.onGet(APIRoute.Login).reply(200, []);
    mockAPI.onGet(APIRoute.Films).reply(200, mockFilms);
    mockAPI.onGet(APIRoute.Promo).reply(200, mockFilm);
    mockAPI.onGet(new RegExp(`^${APIRoute.Films}/[^/]+/similar$`)).reply(200, []);
    mockAPI.onGet(new RegExp(`^${APIRoute.Films}/[^/]+$`)).reply(200, mockFilm);
    mockAPI.onGet(`${APIRoute.Comments}/1`).reply(200, []);
    mockAPI.onGet(APIRoute.Favorite).reply(200, []);

    mockAPI.onGet().reply(200, []);

    testHistory.push('');
  });

  afterEach(() => {
    mockAPI.resetHandlers();
  });

  it('should render "MainScreen"', () => {
    const promoFilm = (testStore.getState()[NameSpace.Data] as FilmDataType).promoFilm;
    testHistory.push(APIRoute.Main);
    render(testApp);
    expect(screen.getByText(new RegExp(promoFilm?.title ?? '', 'i'))).toBeInTheDocument();
  });

  it('should render "FilmScreen"', () => {
    const activeFilm = (testStore.getState()[NameSpace.Data] as FilmDataType).activeFilm.film;
    testHistory.push(generatePath(`${AppRoute.Films}/:id`, { id: String(activeFilm?.id ?? '') }));
    render(testApp);
    expect(screen.getByText(new RegExp(activeFilm?.title ?? '', 'i'))).toBeInTheDocument();
  });

  it('should render "AddReviewScreen"', () => {
    const activeFilm = (testStore.getState()[NameSpace.Data] as FilmDataType).activeFilm.film;
    testHistory.push(generatePath(AppRoute.AddReview, { id: String(activeFilm?.id ?? '') }));
    render(testApp);
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
  });

  it('should render "MyListScreen"', () => {
    testHistory.push(APIRoute.MyList);
    render(testApp);
    expect(screen.getByText(/My List/i)).toBeInTheDocument();
  });
});
