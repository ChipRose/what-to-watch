
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { getActiveFilm } from '../../store/film-data/selectors';

import type { FilmType } from '../../types/film';
import { AppRoute, AuthorizationStatus } from '../../const/const';
import { fetchAddToWatchAction } from '../../store/api-actions';

import AddIcon from '../icons/add-icon/add-icon';
import DoneIcon from '../icons/done-icon/done-icon';
import PlayIcon from '../icons/play-icon/play-icon';

import ActionButton from '../buttons/action-button/action-button';

type ControlButtonsListProps = {
  isFullList?: boolean;
}

function ControlButtonsList({ isFullList = true }: ControlButtonsListProps) {
  const naigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film: FilmType | null = useAppSelector(getActiveFilm).film ?? null;

  const filmId = film?.id ?? null;

  const handleAddButtonClick = (): void => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      if (filmId) {
        dispatch(fetchAddToWatchAction({ id: filmId, status: film?.isFavorite ? 0 : 1 }));
      }
    } else {
      naigate(AppRoute.LogIn);
    }
  };

  return (
    <div className="film-card__buttons">
      <ActionButton label={'Play'} icon={{ basic: <PlayIcon /> }} />
      <ActionButton label={'My list'} onUpdate={() => handleAddButtonClick()} isChecked={authorizationStatus === AuthorizationStatus.Auth && Boolean(film?.isFavorite ?? 0)} icon={{ basic: <AddIcon />, checked: <DoneIcon /> }} />
      {isFullList && (<ActionButton link={authorizationStatus === AuthorizationStatus.Auth ? `${AppRoute.Films}/${String(filmId)}/review` : AppRoute.LogIn} label={'Add review'} />)}
    </div>
  );
}

export default ControlButtonsList;
