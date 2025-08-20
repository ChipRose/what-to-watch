import { createSlice } from '@reduxjs/toolkit';

import { NameSpace, AuthorizationStatus } from '../../const/const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { getUserProfile } from '../../services/user-profile';

import type { UserProcessType } from '../../types/state';

const initialState: UserProcessType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    avatar: '',
  },
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo.avatar = getUserProfile().avatarUrl;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo.avatar = null;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo.avatar = getUserProfile().avatarUrl;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo.avatar = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo.avatar = null;
      });
  }
});
