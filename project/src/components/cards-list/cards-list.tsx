import { FilmsPreviewList } from '../../types/film';

import withVideoPlayer from '../../hocs/with-video-player/with-video-player';
import SmallFilmCard from '../small-film-card/small-film-card';

type CardsListProps = {
  filmsList: FilmsPreviewList;
};

const SmallFilmCardWrapped = withVideoPlayer(SmallFilmCard);

function CardList({ filmsList }: CardsListProps): JSX.Element {

  return (
    <div
      className='catalog__films-list'
    >
      {
        filmsList?.map((film, playerIndex) => (
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

export default CardList;
