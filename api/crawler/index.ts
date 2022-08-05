



// import fetch from 'node-fetch';
import {default as axios } from '../axios';

let url = "/products/getProductShopee";
const CrawlerAPI_SHOPEE = {
    getProductByID:async (itemID:string,shopID:string)=>{
        return axios({
            url:url,
            method:"POST",
            data:{itemID,shopID},
        })


    }
  
}





export default CrawlerAPI_SHOPEE;

