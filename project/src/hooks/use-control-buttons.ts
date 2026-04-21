import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from './use-app-selector';
import { useAppDispatch } from './use-app-dispatch';
import { getAuthorizationStatus } from '../store/reducers/user-process/selectors';
import { fetchAddToWatchAction } from '../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../const/const';

import type { FilmType } from '../types/film';

type UseControlButtonsResult = {
  authorizationStatus: AuthorizationStatus;
  isFavorite: boolean;
  filmId: number | null;
  handleFavoriteClick: () => void;
};

function useControlButtons(film: FilmType | null): UseControlButtonsResult {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isFavorite = film?.isFavorite ?? false;
  const filmId = film?.id ?? null;

  const handleFavoriteClick = useCallback((): void => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      if (filmId) {
        dispatch(fetchAddToWatchAction({ id: filmId, status: film?.isFavorite ? 0 : 1 }));
      }
      return;
    }

    navigate(AppRoute.LogIn);
  }, [authorizationStatus, filmId, film?.isFavorite, dispatch, navigate]);

  return {
    authorizationStatus,
    isFavorite,
    filmId,
    handleFavoriteClick
  };
}

export default useControlButtons;
