import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getFilms = (state: StateType) => state[NameSpace.Data].films;
export const getMyList = (state: StateType) => state[NameSpace.Data].myList;
export const getIsFilmsLoaded = (state: StateType) =>
  state[NameSpace.Data].isFilmsLoaded;
export const getError = (state: StateType) => state[NameSpace.Data].error;
