
import { store } from '../store';
import { setError } from '../store/actions';
import { resetErrorAction } from '../store/api-actions';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(resetErrorAction());
};
