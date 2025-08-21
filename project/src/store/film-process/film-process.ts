import { createSlice } from '@reduxjs/toolkit';

import { NameSpace } from '../../const/const';

import type { FilmProcessType } from '../../types/state';


const initialState: FilmProcessType = {
  myList: [],
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {
  },
});
