const AUTH_TOKEN_KEY_NAME = 'wtw-token';
const AVATAR_SRC = 'wtw-avatar';

export type TokenType = string;

export type UserInfoType = {
  token: TokenType;
  avatarUrl: string;
}

export const getUserProfile = (): UserInfoType => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
  const avatarUrl = localStorage.getItem(AVATAR_SRC) ?? '';
  return ({ token, avatarUrl });
};

export const saveUserProfile = (userInfo: UserInfoType): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, userInfo?.token);
  localStorage.setItem(AVATAR_SRC, userInfo?.avatarUrl);
};

export const dropUserProfile = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(AVATAR_SRC);
};
