
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

import type { FilmType } from '../../types/film';
import { AppRoute, APIRoute, AuthorizationStatus } from '../../const/const';
import { fetchAddToWatchAction } from '../../store/api-actions';

import AddIcon from '../icons/add-icon/add-icon';
import DoneIcon from '../icons/done-icon/done-icon';
import PlayIcon from '../icons/play-icon/play-icon';

import ActionButton from '../buttons/action-button/action-button';

type ControlButtonsListProps = {
  hasReview?: boolean;
  film: FilmType | null;
}

function ControlButtonsList({ hasReview = true, film }: ControlButtonsListProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFavorite = film?.isFavorite ?? false;
  const filmId = film?.id ?? null;

  const handleFavoriteClick = (): void => {
    if (authorizationStatus === AuthorizationStatus.Auth) {

      if (filmId) {
        dispatch(fetchAddToWatchAction({ id: filmId, status: film?.isFavorite ? 0 : 1 }));
      }
    } else {
      navigate(AppRoute.LogIn);
    }
  };

  return (
    <div className="film-card__buttons">
      <ActionButton label={'Play'} icon={{ basic: <PlayIcon /> }} link={`${APIRoute.Player}/${String(filmId)}`} />
      <ActionButton label={'My list'} onUpdate={handleFavoriteClick} isChecked={isFavorite} icon={{ basic: <AddIcon />, checked: <DoneIcon /> }} />
      {hasReview && (<ActionButton link={authorizationStatus === AuthorizationStatus.Auth ? `${AppRoute.Films}/${String(filmId)}${AppRoute.AddReview}` : AppRoute.LogIn} label={'Add review'} />)}
    </div>
  );
}

export default ControlButtonsList;
