import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface MenuState {
  open: boolean;
}
const initialState: MenuState = {
  open: false,
};
export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changeMenu: (state, action: any) => {
      state.open = !state.open;
    },
    setCloseMenu: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeMenu, setCloseMenu } = menuSlice.actions;
export default menuSlice.reducer;
