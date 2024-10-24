import { useState } from 'react';

import { FilmsPreviewList } from '../../types/film';

import Card from '../small-film-card/small-film-card';

type CardsListProps = {
  filmsList: FilmsPreviewList;
};

function CardList({ filmsList }: CardsListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleCardMouseMove = (id: number) => {
    setActiveCard(id);
  };

  const handleCardMouseLeave = () => {
    setActiveCard(null);
  };


  return (
    <div
      className='catalog__films-list'
    >
      {
        filmsList?.map((film) => (
          <Card
            {...film}
            key={film.id}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          />
        ))
      }
    </div>
  );
}

export default CardList;
