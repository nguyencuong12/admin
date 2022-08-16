// import fetch from 'node-fetch';
import { default as axios } from '../axios';

let url = '/products/getProductShopee';

const CrawlerAPI_SHOPEE = {
  getProductByID: async (shopeeUrl: String) => {
    return axios({
      url: url,
      method: 'POST',
      data:{
        shopeeUrl
      }
    });
  },
};

export default CrawlerAPI_SHOPEE;
