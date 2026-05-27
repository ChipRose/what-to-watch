import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import SmallFilmCard from '../../components/small-film-card/small-film-card';
import {makeTestFilm} from '../../util/mocks';
import {adaptFilmToApp} from '../../util/util-adapt-data';

import withVideoPreview from './with-video-preview';


jest.mock('../../components/preview-player/preview-player', () => {
  const mockPreviewPlayer = () => <>This is mock PreviewPlayer</>;

  return {
    __esModule: true,
    default: mockPreviewPlayer,
  };
});

describe('HOC: withVideoPreview', () => {
  it('base component should correct rendering when use with HOC', () => {
    const BaseComponentWrapped = withVideoPreview(() => <h1>withVideoPreview</h1>);
    
    render(
      <BaseComponentWrapped />
    );

    expect(screen.getByText('withVideoPreview')).toBeInTheDocument();
  })

  it('base component should correct rendering another component with render-prop', () => {
    const history = createMemoryHistory();
    const WrappedComponent = withVideoPreview(SmallFilmCard);
    const onFilmClick = jest.fn();
    const testFilm = makeTestFilm();

    render(
      <HistoryRouter history={history}>
        <WrappedComponent
          id={testFilm.id}
          title={testFilm.name}
          previewSrc={testFilm.previewVideoLink}
          previewImage={testFilm.posterImage}
          playerIndex={1}
          onFilmClick={onFilmClick}
        />
      </HistoryRouter>
    );

    expect(screen.getByText(testFilm.name)).toBeInTheDocument();
    expect(screen.getByText('This is mock PreviewPlayer')).toBeInTheDocument();
  });
})