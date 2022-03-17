import { default as axios } from "../axios";
import { ProductInf } from "../../interface/";

let url = "/product";
const Product = {
  getAllProduct: async () => {
    return await axios.get(url);
  },
  getProduct: async (id: any) => {
    console.log("ID asdasd", id);
    return await axios({
      method: "GET",
      url: url + "/" + id,
      // params: {
      //   id: id,
      // },
    });
  },
  updateProduct: async (product: any) => {
    // const { _id } = product;
    console.log("PRODUCT", product);
    return await axios({
      method: "POST",
      url: url + "/update",
      data: product,
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  createProduct: async (data: any) => {
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
