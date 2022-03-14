import { createSlice, configureStore } from "@reduxjs/toolkit";
// import { default as sidebarReducer } from "./reducers/sidebar";

// const reducer = {
//   sidebar: sidebarReducer,
// };
import { default as sidebarReducer } from "../store/slices/sidebar";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
