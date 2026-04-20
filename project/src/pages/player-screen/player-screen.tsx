import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { getActiveFilm } from '../../store/film-data/selectors';
import { setActiveFilm } from '../../store/film-data/film-data';

import VideoPlayer from '../../components/video-player/video-player';

type RouteParams = {
  id: string;
};

function PlayerScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const { id } = useParams<RouteParams>();
  const activeFilm = useAppSelector(getActiveFilm).film || null;

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(setActiveFilm(Number(id)));
  }, [dispatch, id]);

  return (
    <VideoPlayer film={activeFilm} />
  );
}

export default PlayerScreen;
