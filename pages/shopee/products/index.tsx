import React, { useEffect, useState } from "react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import ShopeeTableComponent from "../../../components/shopee/table";

const ProductShopee = () => {
    const [products, setProducts] = useState<any[]>();

    useEffect(() => {
        Promise.all([fetchAllProduct()]);
    }, []);
    const fetchAllProduct = async () => {
        let response = await CrawlerAPI_SHOPEE.fetchAllProductInShopee();
        setProducts(response.data.products);
    };

    return (
        <div>{products && <ShopeeTableComponent products={products}></ShopeeTableComponent>}</div>
    );
};

export default ProductShopee;
