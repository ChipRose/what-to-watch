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

import AddReviewScreen from './add-review-screen';

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
const film = adaptFilmToApp(mockFilm);
const films = adaptFilmsDataToApp(mockFilms) ?? [];
const filmsWithActive = film ? [film, ...films] : films;
const groupedFilms = { [Genre.All]: filmsWithActive };

const testStore = mockStore({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth, userInfo: { avatar: null } },
  [NameSpace.Data]: {
    isDataLoaded: true,
    films: filmsWithActive,
    promoFilm: film,
    myList: filmsWithActive,
    groupedFilms,
    activeFilm: {
      film,
      reviews: [],
      similarFilms: [],
    },
  },
  [NameSpace.Film]: {
    catalog: {
      films: filmsWithActive,
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
        <Route path={AppRoute.AddReview} element={<AddReviewScreen />} />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: AddReviewScreen', () => {
  it('should render correctly', () => {
    testHistory.push(generatePath(AppRoute.AddReview, { id: String(film?.id ?? '') }));
    render(testApp);

    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Post/i })).toBeInTheDocument();
  });
});
