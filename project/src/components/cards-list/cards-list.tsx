import { FilmsList } from '../../types/film';

import Card from '../card/card';

type CardsListProps = {
  filmsList: FilmsList;
};

function CardList({ filmsList }: CardsListProps): JSX.Element {
  return (
    <div className='catalog__films-list'>
      {
        filmsList?.map(({ cover, title, src, id }) => (
          <Card cover={cover} title={title} src={src} key={id} />
        ))
      }
    </div>
  );
}

export default CardList;
