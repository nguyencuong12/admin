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
    Object.keys(product || "").map((key) => {
      if (key === "imageUpload") {
        formData.append("imageUpload", product.imageUpload!);
      } else {
        let data = product[key as keyof createProductInf]?.toString();
        formData.append(key, data || "");
      }
    });

    let response = await ProductAPI.createProduct(formData);
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
