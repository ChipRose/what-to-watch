import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';

import { AppRoute } from '../../../const/const';

import { redirect } from './redirect';
import { redirectToRoute } from '../../actions';

import type { StoreType } from '../../../types/state';

const testHistory = {
  location: { pathname: '' },
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => testHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<StoreType, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    testHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.LogIn));
    expect(testHistory.location.pathname).toBe(AppRoute.LogIn);
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.LogIn),
    ]);
  });
});