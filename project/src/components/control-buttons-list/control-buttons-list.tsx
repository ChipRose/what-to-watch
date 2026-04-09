import { memo } from 'react';
import { AppRoute, APIRoute, AuthorizationStatus } from '../../const/const';
import useControlButtons from '../../hooks/use-control-buttons';

import AddIcon from '../icons/add-icon/add-icon';
import DoneIcon from '../icons/done-icon/done-icon';
import PlayIcon from '../icons/play-icon/play-icon';
import ActionButton from '../buttons/action-button/action-button';

import type { FilmType } from '../../types/film';

type ControlButtonsListProps = {
  hasReview?: boolean;
  film: FilmType | null;
}

function ControlButtonsList({ hasReview = true, film }: ControlButtonsListProps) {
  const { authorizationStatus, isFavorite, filmId, handleFavoriteClick } = useControlButtons(film);

  return (
    <div className="film-card__buttons">
      <ActionButton label={'Play'} icon={{ basic: <PlayIcon /> }} link={`${APIRoute.Player}/${String(filmId)}`} />
      <ActionButton label={'My list'} onUpdate={handleFavoriteClick} isChecked={isFavorite} icon={{ basic: <AddIcon />, checked: <DoneIcon /> }} />
      {hasReview && (<ActionButton link={authorizationStatus === AuthorizationStatus.Auth ? `${AppRoute.Films}/${String(filmId)}${AppRoute.AddReview}` : AppRoute.LogIn} label={'Add review'} />)}
    </div>
  );
}

export default memo(ControlButtonsList);
