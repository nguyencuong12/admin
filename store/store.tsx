import { createSlice, configureStore } from "@reduxjs/toolkit";
// import { default as sidebarReducer } from "./reducers/sidebar";

// const reducer = {
//   sidebar: sidebarReducer,
// };
import { default as sidebarReducer } from "../store/slices/sidebar";
import { default as productReducer } from "../store/slices/product";
import { default as menuReducer } from "../store/slices/menu";

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    product: productReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
