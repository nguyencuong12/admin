import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface SidebarState {
  open: boolean;
}
const initialState: SidebarState = {
  open: true,
};
export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    change: (state, action) => {
      state.open = !state.open;
    },
  },
});

// Action creators are generated for each case reducer function
export const { change } = sidebarSlice.actions;
export default sidebarSlice.reducer;
