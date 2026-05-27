import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { AppRoute, AuthorizationStatus, NameSpace } from '../../const/const';

import HistoryRouter from '../history-route/history-route';
import PrivateRoute from './private-route';

const mockStore = configureMockStore();
const testHistory = createMemoryHistory();

const testComponent = (store: ReturnType<typeof mockStore>) => (
  <Provider store={store}>
    <HistoryRouter history={testHistory}>
      <Routes>
        <Route
          path={AppRoute.LogIn}
          element={<h1>Public Route</h1>}
        />
        <Route
          path='/private'
          element={
            <PrivateRoute
              authorizationStatus={store.getState()[NameSpace.User].authorizationStatus}
            >
              <h1>Private Route</h1>
            </PrivateRoute>
          }
        />
      </Routes>
    </HistoryRouter>
  </Provider>
);

describe('Component: PrivateRouter', () => {
  beforeEach(() => {
    testHistory.push('/private');
  });

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.NoAuth },
    });
    render(testComponent(store));

    expect(screen.getByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });
    render(testComponent(store));

    expect(screen.getByText(/Private Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
  });
})