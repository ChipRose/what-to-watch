type CardProps = {
  cover: string;
  title: string;
  src: string;
};

function Card({ cover, title, src }: CardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card">
      <div className="small-film-card__image">
        <img
          src={cover}
          alt={title}
          width="280"
          height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <a className="small-film-card__link" href={src}>
          {title}
        </a>
      </h3>
    </article>
  );
}

export default Card;
