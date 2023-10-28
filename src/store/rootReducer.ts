import { combineReducers } from '@reduxjs/toolkit';
import playerReducer from 'store/player/slice';

export const createRootReducer = () => {
  return combineReducers({
    player: playerReducer,
  });
};
