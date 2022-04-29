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
        setProduct(response.data.product);
      });
    }
  }, [pid]);
  useEffect(() => {}, [product]);

  const fetchResUpdate = async (data: FormData) => {
    let response = await ProductAPI.updateProduct(data);

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
  };

  const onUpdate = async (product: ProductInf) => {
    let formData = new FormData();
    Object.keys(product).map((key) => {
      let data = product[key as keyof ProductInf]?.toString();
      if (key === "imageUpload") {
        formData.append("imageUpload", product.imageUpload!);
      } else {
        formData.append(key, data || "");
      }
    });
    await fetchResUpdate(formData);
  };

  return (
    <>
      <FormInputProduct product={product} title={"Update Product"} btnTitle={"Update"} callback={onUpdate}></FormInputProduct>
    </>
  );
};

export default ViewProduct;
