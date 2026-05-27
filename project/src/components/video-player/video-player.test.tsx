import { fireEvent, render, screen } from '@testing-library/react';

import VideoPlayer from './video-player';
import { makeTestFilm } from '../../util/mocks';
import { adaptFilmToApp } from '../../util/util-adapt-data';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Component: VideoPlayer', () => {
  const film = adaptFilmToApp(makeTestFilm());

  beforeEach(() => {
    mockNavigate.mockClear();
    (HTMLMediaElement.prototype.play as jest.Mock).mockClear();
    (HTMLMediaElement.prototype.pause as jest.Mock).mockClear();
  });

  it('should return null when film is null', () => {
    render(<VideoPlayer film={null} />);
    expect(screen.queryByTestId('player-video')).not.toBeInTheDocument();
  });

  it('should pause and navigate back on exit click', () => {
    if (!film) {
      throw new Error('Failed to create test film');
    }

    render(<VideoPlayer film={film} />);

    fireEvent.click(screen.getByRole('button', { name: 'Exit' }));

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('should toggle play button state on click', () => {
    if (!film) {
      throw new Error('Failed to create test film');
    }

    render(<VideoPlayer film={film} />);
    const video = screen.getByTestId('player-video');

    const pauseMock = jest.fn();
    Object.defineProperty(video, 'pause', { configurable: true, value: pauseMock });

    Object.defineProperty(video, 'paused', { configurable: true, value: false });
    fireEvent.click(screen.getByRole('button', { name: /Pause/i }));
    expect(screen.getByRole('button', { name: /Play/i })).toBeInTheDocument();
    expect(pauseMock).toHaveBeenCalled();
  });
});

