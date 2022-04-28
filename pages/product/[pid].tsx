import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProductAPI } from "../../api";
import { ProductInf, sweetAlertInf } from "../../interface";
import { FormInputProduct } from "../../components";
import alertMessage from "../../components/toast";
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

  const onUpdate = async (product: ProductInf) => {
    let formData = new FormData();
    console.log("PRODUCT UPDATE", product);

    Object.keys(product).map((key) => {
      let data = product[key as keyof ProductInf]?.toString();
      if (key === "image") {
        formData.append("image", product.image?.toString()!);
      } else {
        formData.append(key, data || "");
      }
    });
    // formData.append(product.title!, product.title!);
    // formData.append(key, data || "");

    // Object.keys(product || "").map((key) => {
    //   if (key === "image") {
    //     if (typeof product.image === "string") {
    //       formData.append("image", product.image);
    //     } else {
    //       formData.append("imageUpdate", product.image);
    //     }
    //     // formData.append("imageUpdate", product.image);
    //   } else {
    //     let data = product[key as keyof ProductInf]?.toString();
    //     formData.append(key, data || "");
    //   }
    // });
    // formData.append("test", img);

    let response = await ProductAPI.updateProduct(formData);
    if (response) {
      let objectAlert: sweetAlertInf = {
        title: "Update Status",
        content: "Update Product Success !!",
        icon: "success",
      };
      let status = await alertMessage(objectAlert);
      if (status) {
        router.push("/");
      }
    }
    // console.log("response", response);
  };

  return (
    <>
      <FormInputProduct product={product} title={"Update Product"} btnTitle={"Update"} callback={onUpdate}></FormInputProduct>
    </>
  );
};

export default ViewProduct;
