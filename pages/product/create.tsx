import React from "react";

import { FormInputProduct, AlertComponent } from "../../components";
import { createProductInf, ProductInf, sweetAlertInf } from "../../interface";
import { ProductAPI } from "../../api";
import { useRouter } from "next/router";
const CreateProduct = () => {
  const router = useRouter();

  const onCreate = async (product: createProductInf) => {
    if (!product?.title || !product?.description || !product?.type || !product?.image || !product?.hashtag || !product?.price) {
      console.log("MISSING INPUT FIELD !!!");
    } else {
      let formData = new FormData();

      Object.keys(product || "").map((key) => {
        console.log("KEY", key);
        if (key === "image") {
          formData.append("image", product.image || "");
        } else {
          let data = product[key as keyof createProductInf]?.toString();
          formData.append(key, data || "");
        }
      });

      let response = await ProductAPI.createProduct(formData);
      if (response) {
        let objectAlert: sweetAlertInf = {
          title: "Create Status",
          content: "Create Product Success !!",
          icon: "success",
        };
        let status = await AlertComponent(objectAlert);
        if (status) {
          router.push("/");
        }
      }
    }
  };
  return (
    <div>
      <FormInputProduct title={"Create Product"} btnTitle={"Create Product"} callback={onCreate}></FormInputProduct>
    </div>
  );
};

export default CreateProduct;
