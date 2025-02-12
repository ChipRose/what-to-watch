import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// import { setFilms, setReviews } from './store/actions';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';

import { store } from './store';

import App from './components/app/app';
import ErrorMessage from './components/error-message/error-message';

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());
// store.dispatch(setFilms(filmsList));
// store.dispatch(setReviews(reviewsList));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App />
    </Provider>
  </React.StrictMode>
);
