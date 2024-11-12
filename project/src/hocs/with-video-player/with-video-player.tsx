import { ComponentType, useState } from 'react';
import VideoPlayer from '../../components/video-player/video-player';

type HOCProps = {
  renderPlayer: (
    previewSrc: string,
    id: number,
    poster: string,
  ) => void;
};

function withAudioPlayer<T>(Component: ComponentType<T>)
  : ComponentType<Omit<T, keyof HOCProps>> {

  type ComponentProps = Omit<T, keyof HOCProps>;

  function WithAudioPlayer(props: ComponentProps): JSX.Element {
    const TIME_DELAY = 1000;
    let hoverTimeout: ReturnType<typeof setTimeout>;

    const [activePlayerId, setActivePlayerId] = useState<number>(-1);

    const onMouseEnter = (playerIndex: number) => {
      hoverTimeout = setTimeout(() => {
        setActivePlayerId(playerIndex);
      }, TIME_DELAY);
    };

    const onMouseLeave = () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      setActivePlayerId(-1);
    };

    return (
      <Component
        {...props as T}
        renderPlayer={(previewSrc: string, playerIndex: number, poster: string) => (
          <VideoPlayer
            playerIndex={playerIndex}
            previewSrc={previewSrc}
            poster={poster}
            isPlaying={playerIndex === activePlayerId}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        )}
      />
    );

  }

  return WithAudioPlayer;
}

export default withAudioPlayer;
