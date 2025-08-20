import { combineReducers } from '@reduxjs/toolkit';

import { NameSpace } from '../const/const';

import { filmData } from './film-data/film-data';
import { filmProcess } from './film-process/film-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Data]: filmData.reducer,
  [NameSpace.User]: userProcess.reducer,
});

