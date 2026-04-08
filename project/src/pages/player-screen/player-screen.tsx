import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getFilms } from '../../store/film-data/selectors';

import VideoPlayer from '../../components/video-player/video-player';

type RouteParams = {
  id: string;
};

function PlayerScreen(): JSX.Element {
  const { id } = useParams<RouteParams>();
  const films = useAppSelector(getFilms);
  const film = films?.find((item) => item.id === Number(id)) || null;

  return (
    <VideoPlayer film={film} />
  );
}

export default PlayerScreen;
