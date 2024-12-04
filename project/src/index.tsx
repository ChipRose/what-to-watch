import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from './store/reducer';
import { setFilms, setReviews } from './store/actions';

import { filmsList } from './mocks/films';
import { reviewsList } from './mocks/review';


import App from './components/app/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const store = configureStore({ reducer });

store.dispatch(setFilms(filmsList));
store.dispatch(setReviews(reviewsList));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
