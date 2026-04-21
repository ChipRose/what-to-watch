import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { generatePath } from 'react-router-dom';

import { AppRoute } from '../../const/const';
import { makeTestFilm } from '../../util/mocks';
import { adaptFilmToApp } from '../../util/util-adapt-data';

import HistoryRouter from '../history-route/history-route';
import SmallFilmCard from './small-film-card';

const testHistory = createMemoryHistory();
const onFilmClick = jest.fn();
const renderPlayer = jest.fn(() => <div data-testid="preview-player" />);

const testFilm = makeTestFilm();
const testAdaptedFilm = adaptFilmToApp(testFilm);

const testCardProps = {
  id: testAdaptedFilm?.id ?? 0,
  playerIndex: 0,
  previewImage: testAdaptedFilm?.previewImage ?? '',
  title: testAdaptedFilm?.title ?? '',
  previewSrc: testAdaptedFilm?.previewSrc ?? '',
  onFilmClick,
  renderPlayer,
};

const testComponent = (
  <HistoryRouter history={testHistory}>
    <SmallFilmCard {...testCardProps} />
  </HistoryRouter>
);

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    render(testComponent);

    expect(screen.getByText(testCardProps.title)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: testCardProps.title }))
      .toHaveAttribute('href', generatePath(AppRoute.Film, { id: String(testCardProps.id) }));
    expect(screen.getByTestId('small-film-card')).toBeInTheDocument();
    expect(renderPlayer).toHaveBeenCalledWith(
      testCardProps.previewSrc,
      testCardProps.playerIndex,
      testCardProps.previewImage
    );
  });
});
