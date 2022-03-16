import { default as axios } from "../axios";
let url = "/product";
const Product = {
  getAllProduct: async () => {
    return await axios.get(url);
  },
  getProduct: async (id: string) => {
    return await axios({
      method: "GET",
      url: url,
      params: {
        id: id,
      },
    });
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
