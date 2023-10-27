import { combineReducers } from '@reduxjs/toolkit';
// import mainReducer from 'store/main/slice';
import playerReducer from 'store/player/slice';

export const createRootReducer = () => {
  return combineReducers({
    // main: mainReducer,
    player: playerReducer,
  });
};
