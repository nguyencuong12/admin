import React from "react";

import { FormInputProduct } from "../../components";
import { createProductInf, ProductInf } from "../../interface";
import { ProductAPI } from "../../api";
const createProduct = () => {
  const onCreate = async (product: createProductInf) => {
    if (!product?.title || !product?.description || !product?.type || !product?.image || !product?.hashtag || !product?.price) {
      console.log("MISSING INPUT FIELD !!!");
    } else {
      let formData = new FormData();
      Object.keys(product || "").map((key) => {
        if (key === "image") {
          formData.append("image", product.image || "");
        } else {
          let data = product[key as keyof createProductInf]?.toString();
          formData.append(key, data || "");
        }
      });
      // formData;
      let response = await ProductAPI.createProduct(formData);
      console.log("RESPONSE", response);
    }
  };
  return (
    <div>
      <FormInputProduct title={"Create Product"} btnTitle={"Create Product"} callback={onCreate}></FormInputProduct>
    </div>
  );
};

export default createProduct;
