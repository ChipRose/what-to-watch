import { fireEvent, render } from '@testing-library/react';

import PreviewPlayer from './preview-player';

describe('Component: PreviewPlayer', () => {
  const onMouseEnter = jest.fn();
  const onMouseLeave = jest.fn();

  beforeEach(() => {
    onMouseEnter.mockClear();
    onMouseLeave.mockClear();
    (HTMLMediaElement.prototype.play as jest.Mock).mockClear();
    (HTMLMediaElement.prototype.pause as jest.Mock).mockClear();
    (HTMLMediaElement.prototype.load as jest.Mock).mockClear();
  });

  it('should call hover handlers and pass player id', () => {
    const { container } = render(
      <PreviewPlayer
        playerIndex={5}
        previewSrc="preview.mp4"
        poster="poster.jpg"
        isPlaying={false}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    if (!video) {
      return;
    }

    fireEvent.mouseEnter(video);
    fireEvent.mouseLeave(video);

    expect(onMouseEnter).toHaveBeenCalledWith(5);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should play only after media loaded when isPlaying is true', () => {
    const { container, rerender } = render(
      <PreviewPlayer
        playerIndex={1}
        previewSrc="preview.mp4"
        poster="poster.jpg"
        isPlaying={false}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    if (!video) {
      return;
    }

    expect(HTMLMediaElement.prototype.pause).toHaveBeenCalled();
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();

    fireEvent.loadedData(video);

    rerender(
      <PreviewPlayer
        playerIndex={1}
        previewSrc="preview.mp4"
        poster="poster.jpg"
        isPlaying
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

    expect(HTMLMediaElement.prototype.play).toHaveBeenCalled();
  });
});

