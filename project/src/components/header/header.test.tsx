import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk, { ThunkDispatch } from 'redux-thunk';
import type { AnyAction } from 'redux';

import { NameSpace, AuthorizationStatus } from '../../const/const';
import { createApi } from '../../services/api';
import HistoryRouter from '../history-route/history-route';
import Header from './header';

import type { StateType } from '../../types/state';

const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  StateType,
  AnyAction,
  ThunkDispatch<StateType, typeof api, AnyAction>
>(middlewares);
const testHistory = createMemoryHistory();



const testComponent = (testStore: ReturnType<typeof mockStore>)=>(
  <Provider store={testStore}>
    <HistoryRouter history={testHistory}>
      <Header />
    </HistoryRouter>
  </Provider>
);

describe('Component: Header', () => {


  it('should render correctly for unauth user', () => {
    const testStore = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: { avatar: null },
      },
    });
    render(testComponent(testStore));

    expect(screen.getByRole('link', { name: /Sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /w\s*t\s*w/i })).toBeInTheDocument();
  });

  it('should render correctly for auth user', () => {
    const testStore = mockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: { avatar: 'https://example.com/avatar.png' },
      },
    });
    render(testComponent(testStore));

    expect(screen.getByRole('img', { name: /User avatar/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Sign out/i })).toBeInTheDocument();
  });
});
