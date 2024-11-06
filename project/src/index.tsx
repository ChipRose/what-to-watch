import React from 'react';
import ReactDOM from 'react-dom/client';

import { filmsList, activeFilm } from './mocks/films';
import { reviewsList } from './mocks/review';

import App from './components/app/app';

const FAVORITE_FILM_COUNT = 12;
const SIMILAR_FILM_COUNT = 4;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmsList={filmsList}
      activeFilm={activeFilm}
      reviewsList={reviewsList}
      favoriteFilmCount={FAVORITE_FILM_COUNT}
      similarFilmCount={SIMILAR_FILM_COUNT}
    />
  </React.StrictMode>
);
