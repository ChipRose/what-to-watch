import { ComponentType, useState, useRef } from 'react';
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
    const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

    const [activePlayerId, setActivePlayerId] = useState<number>(-1);

    const onMouseEnter = (playerIndex: number) => {
      hoverTimeout.current = setTimeout(() => {
        setActivePlayerId(playerIndex);
      }, TIME_DELAY);
    };

    const onMouseLeave = () => {
      if (hoverTimeout.current) {
        clearTimeout(hoverTimeout.current);
        hoverTimeout.current = null;
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
