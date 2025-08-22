import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getCatalog = (state: StateType) => state[NameSpace.Film].catalog;


