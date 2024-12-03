import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { reducer } from './store/reducer';
import { setFilms } from './store/actions';

import { filmsList } from './mocks/films';
import { reviewsList } from './mocks/review';


import App from './components/app/app';

const FAVORITE_FILM_COUNT = 12;
const SIMILAR_FILM_COUNT = 4;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore({ reducer });

store.dispatch(setFilms(filmsList));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        filmsList={filmsList}
        reviewsList={reviewsList}
        favoriteFilmCount={FAVORITE_FILM_COUNT}
        similarFilmCount={SIMILAR_FILM_COUNT}
      />
    </Provider>
  </React.StrictMode>
);
