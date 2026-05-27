import { renderHook, act } from '@testing-library/react';

import useSetActiveFilm from './use-set-active-film';
import { setActiveFilm } from '../store/reducers/film-data/film-data';
import { makeTestFilm } from '../util/mocks';

const mockDispatch = jest.fn();

jest.mock('./use-app-dispatch', () => ({
  useAppDispatch: () => mockDispatch,
}));

describe('Hook: useSetActiveFilm', () => {
  const testFilm = makeTestFilm();

  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('should return callback function', () => {
    const { result } = renderHook(() => useSetActiveFilm());

    expect(typeof result.current).toBe('function');
  });

  it('should dispatch setActiveFilm with film id', () => {
    const { result } = renderHook(() => useSetActiveFilm());

    act(() => {
      result.current(testFilm.id);
    });

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(setActiveFilm(testFilm.id));
  });
});
