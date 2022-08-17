// import fetch from 'node-fetch';
import ShopeeInf from '../../interface/product/shopee';
import { default as axios } from '../axios';

let url = '/products/getProductShopee';

const CrawlerAPI_SHOPEE = {
  getProductByID: async (shopeeUrl: String) => {
    return axios({
      url: url,
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
  fetchProductFromCategories:(categories:string[])=>{
    return axios({
      url: '/shopee/categories',
      method: 'POST',
      data: categories,
    });
  }
};

export default CrawlerAPI_SHOPEE;
