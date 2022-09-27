// import fetch from 'node-fetch';
import ShopeeInf from "../../interface/product/shopee";
import { default as axios } from "../axios";

let urlShopee = "/shopee";
let url = "/product";

interface productTikiInterface {
  name: string;
  price: number;
  description: string;
  brand: string;
  discount: number;
  stock: number;
  address: string;
  affilateLink: string;
}
export const CrawlerAPI_TIKI = {
  getProductByLinkAffilate: async (linkAffilate: String) => {
    return axios({
      url: url,
      method: "POST",
      data: {
        type: "tiki",
        linkAffilate: linkAffilate,
      },
    });
  },

  createProductByLinkAffilate: async (product: productTikiInterface) => {
    return axios({
      url: url + "/create",
      method: "POST",
      // data: {
      //   product:product,
      // },
      data:product
    });
  },
};
const CrawlerAPI_SHOPEE = {
  getProductByURL: async (shopeeUrl: String) => {
    return axios({
      url: urlShopee + "/getProductShopee",
      method: "POST",
      data: {
        shopeeUrl,
      },
    });
  },
  createProductByShopee: (product: ShopeeInf) => {
    return axios({
      url: "/shopee",
      method: "POST",
      data: product,
    });
  },
  updateProductByShopee: (product: ShopeeInf) => {
    return axios({
      url: "/shopee",
      method: "PUT",
      data: product,
    });
  },
  fetchAllProductInShopee: (page: number) => {
    return axios({
      url: "/shopee",
      method: "GET",
      params: {
        page: page,
      },
    });
  },
  deleteProductByID: (id: string) => {
    console.log("ID", id);
    return axios({
      url: "/shopee",
      method: "DELETE",
      params: {
        id: id,
      },
    });
  },
  fetchProductFromItemID: (itemID: any) => {
    return axios({
      url: `/shopee/${itemID}`,
      method: "GET",
    });
  },
  searchProductInShopee: (titleProduct: string) => {
    return axios({
      url: `/shopee/search`,
      method: "POST",
      data: {
        title: titleProduct,
      },
    });
  },

  fetchProductFromCategories: (categories: string[]) => {
    return axios({
      url: "/shopee/categories",
      method: "POST",
      data: categories,
    });
  },
};

export default CrawlerAPI_SHOPEE;
