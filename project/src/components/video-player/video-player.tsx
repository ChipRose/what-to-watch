import { useState, useRef, useEffect } from 'react';

type VideoPlayerProps = {
  src: string;
  poster: string;
  width?: number;
  height?: number;
  isPlaying: boolean;
}

function VideoPlayer({ src, poster, isPlaying, ...props }: VideoPlayerProps): JSX.Element {
  const TIME_DELAY = 1000;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (videoRef?.current === null) {
      return;
    }

    videoRef?.current?.addEventListener('loadeddata', () => setIsLoading(false));
    let timeout: ReturnType<typeof setTimeout>;

    if (!isLoading && isPlaying) {
      timeout = setTimeout(() => { videoRef?.current?.play(); }, TIME_DELAY);
      return;
    }

    videoRef?.current?.pause();
    return () => clearTimeout(timeout);

  }, [isPlaying, isLoading]);

  return (
    <video
      width={props.width}
      height={props.height}
      poster={poster}
      autoPlay={isPlaying}
      ref={videoRef}
      muted
    >
      <source src={src} />
    </video>
  );
}

export default VideoPlayer;
