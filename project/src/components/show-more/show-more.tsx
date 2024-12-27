type ShowMoreProps = {
  onUpdate: () => void;
}
function ShowMore({ onUpdate }: ShowMoreProps): JSX.Element {
  const handleClick = () => {
    onUpdate();
  };

  return (
    <button className='catalog__button' onClick={handleClick} type='button'>
      Show more
    </button>
  );
}

export default ShowMore;
