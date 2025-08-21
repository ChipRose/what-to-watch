import { createAction } from '@reduxjs/toolkit';
import { Action, AppRoute } from '../const/const';

export const redirectToRoute = createAction<AppRoute | string>(Action.REDIRECT_TO_ROUTE);
