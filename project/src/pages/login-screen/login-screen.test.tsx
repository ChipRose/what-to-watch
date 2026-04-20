import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';

import { AppRoute, AuthorizationStatus, NameSpace} from '../../const/const';
import { createApi } from '../../services/api';

import HistoryRouter from '../../components/history-route/history-route';
import LoginScreen from './login-screen';

import type { StateType } from '../../types/state';
import type { AnyAction } from 'redux';

const api = createApi();

const middlewares = [thunk.withExtraArgument(api)];

const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);

const testStore = mockStore({
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth, userInfo: { avatar: null } },
});


const testHistory = createMemoryHistory();

const testApp = (
  <Provider store={testStore}>
    <HistoryRouter history={testHistory}>
      <Routes>
        <Route
          path={AppRoute.LogIn}
          element={<LoginScreen />}
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: LoginScreen', () => {
  it('should render correctly', () => {
    testHistory.push(AppRoute.LogIn);
    render(testApp);
    expect(screen.getByRole('heading', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
  });
});