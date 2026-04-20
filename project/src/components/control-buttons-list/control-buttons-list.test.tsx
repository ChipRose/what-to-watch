import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';

import { AuthorizationStatus, NameSpace } from '../../const/const';
import { createApi } from '../../services/api';
import { makeTestFilm } from '../../util/mocks';
import { adaptFilmToApp } from '../../util/util-adapt-data';
import HistoryRouter from '../history-route/history-route';
import ControlButtonsList from './control-buttons-list';

import useControlButtons from '../../hooks/use-control-buttons';

import type { FilmType } from '../../types/film';
import type { StateType } from '../../types/state';

jest.mock('../../hooks/use-control-buttons');

const handleFavoriteClick = jest.fn();

const mockedUseControlButtons = useControlButtons as jest.MockedFunction<typeof useControlButtons>;
const testHistory = createMemoryHistory();
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);
const testStore = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: { avatar: null },
  },
});

const makeTestComponent = (film: FilmType | null) => (
  <Provider store={testStore}>
    <HistoryRouter history={testHistory}>
      <ControlButtonsList film={film} />
    </HistoryRouter>
  </Provider>
);

describe('Component: ControlButtonsList', () => {
  it('should render correctly', () => {
    mockedUseControlButtons.mockReturnValue({
      authorizationStatus: AuthorizationStatus.Auth,
      isFavorite: false,
      filmId: 1,
      handleFavoriteClick: handleFavoriteClick,
    });

    const film = adaptFilmToApp(makeTestFilm());

    render(makeTestComponent(film));

    expect(screen.getByRole('link', { name: /Play/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /My list/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Add review/i })).toBeInTheDocument();
  });
});
