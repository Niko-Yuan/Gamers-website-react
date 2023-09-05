import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";
import genreReducer from "./genreSlice";
import creatorReducer from "./creatorSlice";
import storeReducer from "./storeSlice";
import sidebarReducer from "./sidebarSlice";

const store = configureStore({
  reducer: {
    genre: genreReducer,
    game: gameReducer,
    sidebar: sidebarReducer,
    store: storeReducer,
    creator: creatorReducer,
  },
});

export default store;
