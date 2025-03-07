type AddToMyListButtonProps = {
  isAdded: boolean;
  onUpdate: () => void;
};

function AddToMyListButton({ isAdded, onUpdate }: AddToMyListButtonProps): JSX.Element {
  const handleClick = () => {
    onUpdate();
  };

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleClick}>
      {
        isAdded
          ? (
            <svg viewBox="0 0 18 14" width="18" height="14">
              <use xlinkHref="#in-list"></use>
            </svg>
          )
          : (
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
          )
      }
      <span>My list</span>
    </button>
  );
}

export default AddToMyListButton;
