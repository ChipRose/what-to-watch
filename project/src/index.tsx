import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

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
      <ToastContainer position="bottom-left" />
      <App />
    </Provider>
  </React.StrictMode>
);
