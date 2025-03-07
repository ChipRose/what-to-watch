import { Link } from 'react-router-dom';

type ActionButtonProps = {
  label: string;
  link?: string;
  isChecked?: boolean;
  icon?: {
    basic: JSX.Element;
    checked?: JSX.Element;
  };
  onUpdate?: () => void;
}

function ActionButton({ link, label, isChecked = false, icon, onUpdate }: ActionButtonProps): JSX.Element {
  const handleClick = () => {
    onUpdate && onUpdate();
  };

  return link
    ? (
      <Link to={link} className="btn film-card__button">{label}</Link>
    )
    : (
      <button className="btn btn--list film-card__button" type="button" onClick={handleClick}>
        {icon && (isChecked ? icon.checked : icon.basic)}
        <span>{label}</span>
      </button >
    );
}

export default ActionButton;
