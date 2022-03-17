import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProductAPI } from "../../api";
import { ProductInf } from "../../interface";
import { FormInputProduct } from "../../components";

import { img } from "./base64";
const ViewProduct = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<ProductInf>();
  const [update, setUpdate] = useState(false);
  const [aa, setAA] = useState();

  const fetchProduct = async () => {
    return await ProductAPI.getProduct(pid);
  };
  useEffect(() => {
    if (pid) {
      fetchProduct().then((response) => {
        console.log("response", response.data);
        setProduct(response.data.product);
      });
    }
  }, [pid]);
  useEffect(() => {}, [product]);

  const onUpdate = async (product: any) => {
    console.log("type", img);
    let test = "/+-=14,;'214=-=";
    let formData = new FormData();
    formData.append("image", test);
    let response = await ProductAPI.updateProduct(formData);
    console.log("response", response);
  };

  return (
    <>
      <FormInputProduct product={product} title={"Update Product"} btnTitle={"Update"} callback={onUpdate}></FormInputProduct>
    </>
  );
};

export default ViewProduct;
