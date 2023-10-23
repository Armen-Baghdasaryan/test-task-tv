import { combineReducers } from '@reduxjs/toolkit';
import mainReducer from 'store/main/slice';

export const createRootReducer = () => {
  return combineReducers({
    main: mainReducer,
  });
};
