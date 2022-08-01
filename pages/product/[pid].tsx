import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProductAPI } from "../../api";
import { ProductUpdateInf, sweetAlertInf } from "../../interface";
import { FormInputProduct } from "../../components";
import alertMessage from "../../components/toast";
import SweetAlert2 from "../../utils/sweetAlert";
import { Button } from "@mantine/core";
import { useSetState } from "@mantine/hooks";
import { stringify } from "querystring";
const ViewProduct = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState<ProductUpdateInf>();

    useEffect(() => {
        console.log("PRODUCT FETCH", product);
    }, []);

    useEffect(() => {
        if (product) {
            console.log("PRODUCT CHANGE  >>>> !!", product);
            // setProduct(product);
        }
    }, [product]);

    useEffect(() => {
        if (pid) {
            fetchProductFromIDAndSaveInState();
        }
    }, [pid]);

    const fetchProductFromIDAndSaveInState = async () => {
        let response = await ProductAPI.getProduct(pid);
        setProduct(response.data.product);
        console.log("--------------------------------");
        // await setTimeout(() => {}, 3000);
        // setProduct(response.data.product.image.splice(0, 1));
    };
    const getFormDataForRequest = (product: ProductUpdateInf) => {
        console.log("product", product);
        let formData = new FormData();
        Object.keys(product).map((key) => {
            let data = product[key as keyof ProductUpdateInf]?.toString();
            if (key === "imageUpdate") {
                product[key]?.forEach((element) => {
                    formData.append("imageUpdate", element);
                });
                // formData.append('imageUpdate', element);
            } else if (key === "imageDelete") {
            } else if (key === "image") {
                product[key]?.forEach((element) => {
                    formData.append("image[]", JSON.stringify(element));
                });
            } else {
                formData.append(key, data || "");
            }
        });

        return formData;
    };

    const onHandleUpdateProduct = async (product: ProductUpdateInf) => {
        let formData = getFormDataForRequest(product);
        let response = await ProductAPI.updateProduct(formData);
        // if (response) {
        //     await fetchProductFromIDAndSaveInState();
        //     SweetAlert2.updateSuccess(redirectHome);
        // }
    };
    const redirectHome = () => {
        // router.push("/");
        window.location.href = "/";
    };
    const onHandleDeleteProductImage = async (productUpdate: ProductUpdateInf) => {
        let cloneObject: ProductUpdateInf = {
            ...productUpdate,
        };
        setProduct(cloneObject);

        // let response = await ProductAPI.deleteImagesProduct(productID, idImageDelete);
        // setProduct(response.data.updateStatus);
    };

    return (
        <>
            <FormInputProduct
                product={product}
                title={"Cập nhật sản phẩm "}
                btnTitle={"Cập nhật"}
                type={"update"}
                onHandleDeleteProductImage={onHandleDeleteProductImage}
                callbackUpdateProduct={onHandleUpdateProduct}
            ></FormInputProduct>
        </>
    );
};

export default ViewProduct;
