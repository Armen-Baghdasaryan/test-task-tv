import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface TPlayerState {
  isPaused: boolean;
  isVisiable: boolean;
}

const initialState: TPlayerState = {
  isPaused: false,
  isVisiable: false,
};

const player = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    togglePause: (state, action: PayloadAction<boolean>) => {
      state.isPaused = action.payload;
    },
    toggleVisiable: (state, action: PayloadAction<boolean>) => {
      state.isVisiable = action.payload;
    },
  },
});

export const { togglePause, toggleVisiable } = player.actions;

export default player.reducer;
