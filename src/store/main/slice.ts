import { createSlice } from '@reduxjs/toolkit';

export type TMainState = {};

const initialState: TMainState = {};

const main = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {},
});

export const {} = main.actions;

export default main.reducer;
