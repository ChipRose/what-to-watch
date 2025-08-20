import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { Action } from '../../const/const';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

type RedirectAction = {
  type: typeof Action.REDIRECT_TO_ROUTE;
  payload: string;
};

type AppAction = RedirectAction;

export const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action: AppAction) => {
  if (action.type === Action.REDIRECT_TO_ROUTE) {
    browserHistory.push(action.payload);
  }

  return next(action);
};
