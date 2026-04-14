import { userProcess } from './user-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { getUserProfile, dropUserProfile } from '../../services/user-profile';

import type { UserProcessType } from '../../types/state';
import { AuthorizationStatus } from '../../const/const';

jest.mock('../../services/user-profile', () => ({
  getUserProfile: jest.fn(),
  dropUserProfile: jest.fn(),
}));

const mockUserProfile = {
  token: 'test-token',
  avatarUrl: 'test-avatar-url',
};

describe('Reducer: userProcess', () => {
  let initialState: UserProcessType;

  beforeEach(() => {
    (getUserProfile as jest.Mock).mockClear();
    (getUserProfile as jest.Mock).mockReturnValue(mockUserProfile);
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userInfo: {
        avatar: null,
      },
    };
  });

  it('should return initial state when passed an empty action', () => {
    expect(userProcess.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set Auth status and avatar by check auth fulfilled', () => {
    const result = userProcess.reducer(initialState, { type: checkAuthAction.fulfilled.type });

    expect(getUserProfile).toHaveBeenCalledTimes(1);
    expect(result)
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: {
          avatar: mockUserProfile.avatarUrl,
        }
      });
  });

  it('should set NoAuth status and null avatar by check auth rejected', () => {
    const state: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: {
        avatar: mockUserProfile.avatarUrl,
      },
    };

    expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: {
          avatar: null,
        }
      });
    expect(getUserProfile).not.toHaveBeenCalled();
  });

  it('should set Auth status and avatar by login fulfilled', () => {
    const result = userProcess.reducer(initialState, { type: loginAction.fulfilled.type });

    expect(getUserProfile).toHaveBeenCalledTimes(1);
    expect(result)
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userInfo: {
          avatar: mockUserProfile.avatarUrl,
        }
      });
  });

  it('should set NoAuth status and null avatar by login rejected', () => {
    const state: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: {
        avatar: mockUserProfile.avatarUrl,
      },
    };

    expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: {
          avatar: null,
        }
      });
    expect(getUserProfile).not.toHaveBeenCalled();
    expect(dropUserProfile).toHaveBeenCalledTimes(1);
  });

  it('should set NoAuth status and null avatar by logout fulfilled', () => {
    const state: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Auth,
      userInfo: {
        avatar: mockUserProfile.avatarUrl,
      },
    };

    expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userInfo: {
          avatar: null,
        }
      });
    expect(getUserProfile).not.toHaveBeenCalled();
    expect(dropUserProfile).toHaveBeenCalledTimes(1);
  });
});