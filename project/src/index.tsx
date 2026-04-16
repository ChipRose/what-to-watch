import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import HistoryRouter from './components/history-route/history-route';
import browserHistory from './browser-history';

import { checkAuthAction, fetchFilmsAction, fetchPromoFilmAction } from './store/api-actions';

import { store } from './store';

import App from './components/app/app';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchPromoFilmAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer position="bottom-left" />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
