import React from "react";

import { FormInputProduct } from "../../components";
import { createProductInf, ProductInf } from "../../interface";
import { ProductAPI } from "../../api";
import { useRouter } from "next/router";
import SweetAlert2 from "../../utils/sweetAlert";
const CreateProduct = () => {
  const router = useRouter();
  const onCreate = async (product: ProductInf) => {
    let formData = new FormData();
    console.log("PRODUCT", product);
    Object.keys(product || "").map((key) => {
      if (key == "image") {
        product.image?.forEach((value) => {
          formData.append("image", value);
        });
      }
      if (key == "colors") {
        product.colors?.forEach((value) => {
          formData.append("colors[]", value);
        });
      } else {
        let data = product[key as keyof createProductInf]?.toString();
        formData.append(key, data || "");
      }
    });

    console.log("product create", product);
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
