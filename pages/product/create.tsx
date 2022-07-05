import React from "react";

import { FormInputProduct } from "../../components";
import { createProductInf, ProductInf } from "../../interface";
import { ProductAPI } from "../../api";
import { useRouter } from "next/router";
import SweetAlert2 from "../../utils/sweetAlert";
const CreateProduct = () => {
  const router = useRouter();
  const onCreate = async (product: ProductInf) => {
    console.log("PRODUCT", product);
    let formData = new FormData();
    Object.keys(product || "").map((key) => {
      if (key == "image") {
        product.image?.forEach((value) => {
          formData.append("image", value);
        });
      } else {
        let data = product[key as keyof createProductInf]?.toString();
        formData.append(key, data || "");
      }
    });

    let response = await ProductAPI.createProduct(formData);
    console.log("RESPONSE", response);
    if (response) {
      SweetAlert2.createSuccess();
    }
  };
  return (
    <div>
      <FormInputProduct title={"Create Product"} btnTitle={"Create Product"} callback={onCreate}></FormInputProduct>
    </div>
  );
};

export default CreateProduct;
