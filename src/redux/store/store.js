import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk";
import authReducer from '../reducers/auth';
import messageReducer from '../reducers/message';
import gameReducer from './gameSlice';
import genreReducer from './genreSlice';
import creatorReducer from './creatorSlice';
import storeReducer from './storeSlice';
import sidebarReducer from './sidebarSlice';

const combinedReducer = {
  auth: authReducer,
  message: messageReducer,
  genre: genreReducer,
  game: gameReducer,
  sidebar: sidebarReducer,
  store: storeReducer,
  creator: creatorReducer,
};

const middleware = [thunk];

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
