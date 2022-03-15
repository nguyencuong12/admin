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
    changeSidebar: (state, action: any) => {
      console.log("CHANGE CALL !!!");
      state.open = !state.open;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
