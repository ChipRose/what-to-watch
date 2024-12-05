import { useAppSelector } from '../../hooks/use-app-selector';

import withVideoPlayer from '../../hocs/with-video-player/with-video-player';
import SmallFilmCard from '../small-film-card/small-film-card';

const SmallFilmCardWrapped = withVideoPlayer(SmallFilmCard);

function Catalog(): JSX.Element {
  const catalog = useAppSelector((state) => state.catalog.films);

  return (
    <div
      className='catalog__films-list'
    >
      {
        catalog?.map((film, playerIndex) => (
          <SmallFilmCardWrapped
            {...film}
            playerIndex={playerIndex}
            key={film.id}
          />
        ))
      }
    </div>
  );
}

export default Catalog;
