import { default as axios } from "../axios";
let url = "/product";
const Product = {
  getAllProduct: async () => {
    return await axios.get(url);
  },
  createProduct: async (data: any) => {
    console.log("CALL", data);
    return await axios({
      method: "POST",
      url: url,
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  deleteProduct: () => {},
};
export default Product;
