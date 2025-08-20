import { NameSpace } from '../../const/const';
import { StateType } from '../../types/state';

export const getAuthorizationStatus = (state: StateType) =>
  state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: StateType) => state[NameSpace.User].userInfo;
