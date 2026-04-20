import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';

import HistoryRouter from '../../components/history-route/history-route';
import NotFoundScreen from './not-found-screen';

const testHistory = createMemoryHistory();

const testApp = (
  <HistoryRouter history={testHistory}>
    <NotFoundScreen />
  </HistoryRouter>
);

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(testApp);
    expect(screen.getByText(/404 - Страница не найдена/i)).toBeInTheDocument();
    expect(screen.getByText(/Извините, запрашиваемая страница не существует./i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Вернуться на главную/i })).toBeInTheDocument();
  });
})