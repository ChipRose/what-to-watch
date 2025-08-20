import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getMyList = (state: StateType) => state[NameSpace.Film].myList;
