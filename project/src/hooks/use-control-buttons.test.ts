import { renderHook, act } from '@testing-library/react';

import useControlButtons from './use-control-buttons';
import { useAppSelector } from './use-app-selector';
import { fetchAddToWatchAction } from '../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../const/const';
import { makeTestFilm } from '../util/mocks';
import { adaptFilmToApp } from '../util/util-adapt-data';

import type { FilmType } from '../types/film';

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

jest.mock('./use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual<typeof import('react-router-dom')>('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('./use-app-selector', () => ({
  useAppSelector: jest.fn(),
}));

jest.mock('../store/api-actions', () => ({
  ...jest.requireActual<typeof import('../store/api-actions')>('../store/api-actions'),
  fetchAddToWatchAction: jest.fn((payload: { id: number; status: 1 | 0 }) => (
    jest.requireActual<typeof import('../store/api-actions')>('../store/api-actions').fetchAddToWatchAction(payload)
  )),
}));

const mockedUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;
const mockedFetchAddToWatchAction = fetchAddToWatchAction as jest.MockedFunction<typeof fetchAddToWatchAction>;

describe('Hook: useControlButtons', () => {
  const testFilm = adaptFilmToApp({ ...makeTestFilm(), isFavorite: false }) as FilmType;
  const favoriteFilm = adaptFilmToApp({ ...makeTestFilm(), isFavorite: true }) as FilmType;

  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
    mockedFetchAddToWatchAction.mockClear();
    mockedUseAppSelector.mockReturnValue(AuthorizationStatus.Auth);
  });

  it('should return film data and authorization status', () => {
    const { result } = renderHook(() => useControlButtons(testFilm));

    expect(result.current.authorizationStatus).toBe(AuthorizationStatus.Auth);
    expect(result.current.isFavorite).toBe(false);
    expect(result.current.filmId).toBe(testFilm?.id ?? null);
    expect(typeof result.current.handleFavoriteClick).toBe('function');
  });

  it('should dispatch add to favorite when user is auth', () => {
    const { result } = renderHook(() => useControlButtons(testFilm));

    act(() => {
      result.current.handleFavoriteClick();
    });

    expect(mockedFetchAddToWatchAction).toHaveBeenCalledWith({ id: testFilm.id, status: 1 });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('should dispatch remove from favorite when film is favorite', () => {
    const { result } = renderHook(() => useControlButtons(favoriteFilm));

    act(() => {
      result.current.handleFavoriteClick();
    });

    expect(mockedFetchAddToWatchAction).toHaveBeenCalledWith({ id: favoriteFilm.id, status: 0 });
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });

  it('should navigate to login when user is not auth', () => {
    mockedUseAppSelector.mockReturnValue(AuthorizationStatus.NoAuth);
    const { result } = renderHook(() => useControlButtons(testFilm));

    act(() => {
      result.current.handleFavoriteClick();
    });

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.LogIn);
    expect(mockedFetchAddToWatchAction).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('should not dispatch when film id is missing', () => {
    const { result } = renderHook(() => useControlButtons(null));

    act(() => {
      result.current.handleFavoriteClick();
    });

    expect(mockedFetchAddToWatchAction).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
