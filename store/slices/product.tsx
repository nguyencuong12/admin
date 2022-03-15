import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  loading: boolean;
}
const initialState: ProductState = {
  loading: false,
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProduct: (state, action: any) => {},
    addProduct: (state, action: any) => {
      console.log("add product");
    },
    updateProduct: (state, action: any) => {
      console.log("update product");
    },
    deleteProduct: (state, action: any) => {
      console.log("delete product");
    },
  },
});
export const { addProduct, updateProduct, deleteProduct, fetchProduct } = productSlice.actions;
export default productSlice.reducer;
