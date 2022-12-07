import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoSlice from "./todoSlice";

const rootReducer = combineReducers({ todo: todoSlice.reducer });
const initialState = {};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
