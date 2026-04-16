import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { AuthorizationStatus, NameSpace, APIRoute } from '../../const/const';

import { makeTestFilm, makeTestFilms } from '../../util/mocks';
import { adaptFilmToApp, adaptFilmsDataToApp } from '../../util/util-adapt-data';
import HistoryRouter from '../history-route/history-route';

import App from './app';


const mockFilm = makeTestFilm();
const mockFilms = makeTestFilms();
const mockAdaptedFilm = adaptFilmToApp(mockFilm);
const mockAdaptedFilms = adaptFilmsDataToApp(mockFilms);
const mockStore = configureMockStore();

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
    testHistory.push('');
  });

  it('should render "MainScreen"', () => {
    const promoFilm = testStore.getState()[NameSpace.Data].promoFilm;
    testHistory.push(APIRoute.Main);
    render(testApp);
    expect(screen.getByText(new RegExp(promoFilm?.title, 'i'))).toBeInTheDocument();
  });

  it('should render "FilmScreen"', () => {
    const activeFilm = testStore.getState()[NameSpace.Data].activeFilm.film;
    testHistory.push(`${APIRoute.Films}${activeFilm?.id}`);
    render(testApp);
    expect(screen.getByText(new RegExp(activeFilm?.title, 'i'))).toBeInTheDocument();
  });

});