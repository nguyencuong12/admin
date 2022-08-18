// import fetch from 'node-fetch';
import ShopeeInf from '../../interface/product/shopee';
import { default as axios } from '../axios';

let url = '/shopee';

const CrawlerAPI_SHOPEE = {
  getProductByURL: async (shopeeUrl: String) => {
    return axios({
      url: url+"/getProductShopee",
      method: 'POST',
      data: {
        shopeeUrl,
      },
    });
  },
  createProductByShopee: (product: ShopeeInf) => {
    return axios({
      url: '/shopee',
      method: 'POST',
      data: product,
    });
  },
  fetchAllProductInShopee:()=>{
    return axios({
      url: '/shopee',
      method: 'GET',
    });
  },
  fetchProductFromItemID:(itemID:any)=>{
    return axios({
      url: `/shopee/${itemID}`,
      method: 'GET',
    });
  },

  fetchProductFromCategories:(categories:string[])=>{
    return axios({
      url: '/shopee/categories',
      method: 'POST',
      data: categories,
    });
  }
};

export default CrawlerAPI_SHOPEE;
