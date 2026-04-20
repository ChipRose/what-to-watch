import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { AppRoute } from '../../../const/const';
import HistoryRouter from '../../history-route/history-route';
import ActionButton from './action-button';

const onUpdate = jest.fn();
const testHistory = createMemoryHistory();

const makeLinkComponent = (label: string, link: string) => (
  <HistoryRouter history={testHistory}>
    <ActionButton label={label} link={link} onUpdate={onUpdate} />
  </HistoryRouter>
);

const makeButtonComponent = (label: string) => (
  <ActionButton label={label} onUpdate={onUpdate} />
);

describe('Component: ActionButton', () => {
  it('should render link variant correctly', () => {
    render(makeLinkComponent('Play', '/player/1'));

    expect(screen.getByRole('link', { name: /Play/i })).toHaveAttribute('href', '/player/1');
  });

  it('should render button variant correctly', () => {
    render(makeButtonComponent('My list'));

    expect(screen.getByRole('button', { name: /My list/i })).toBeInTheDocument();
  });

  it('should render route link correctly', () => {
    render(makeLinkComponent('Go to list', AppRoute.MyList));

    expect(screen.getByRole('link', { name: /Go to list/i })).toHaveAttribute('href', AppRoute.MyList);
  });
});
