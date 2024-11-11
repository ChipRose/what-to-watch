import { useState } from 'react';

import { FilmsPreviewList } from '../../types/film';

import SmallFilmCard from '../small-film-card/small-film-card';

type CardsListProps = {
  filmsList: FilmsPreviewList;
};

function CardList({ filmsList }: CardsListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleCardMouseMove = (id: number) => {

    // eslint-disable-next-line
    console.log(id);

    setActiveCard(id);
    setIsPlaying(true);
  };

  const handleCardMouseLeave = () => {
    setActiveCard(null);
    setIsPlaying(false);
  };


  return (
    <div
      className='catalog__films-list'
    >
      {
        filmsList?.map((film) => (
          <SmallFilmCard
            {...film}
            key={film.id}
            isPlaying={isPlaying}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          />
        ))
      }
    </div>
  );
}

export default CardList;
