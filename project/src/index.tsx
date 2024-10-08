import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

const FILM_COUNT = 20;
const FAVORITE_FILM_COUNT = 12;
const SIMILAR_FILM_COUNT = 4;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      filmCount={FILM_COUNT}
      favoriteFilmCount={FAVORITE_FILM_COUNT}
      similarFilmCount={SIMILAR_FILM_COUNT}
    />
  </React.StrictMode>
);
