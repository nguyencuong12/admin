import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ProductAPI } from "../../api";
import { ProductUpdateInf, sweetAlertInf } from "../../interface";
import { FormInputProduct } from "../../components";
import alertMessage from "../../components/toast";
import SweetAlert2 from "../../utils/sweetAlert";
const ViewProduct = () => {
    const router = useRouter();
    const { pid } = router.query;
    const [product, setProduct] = useState<ProductUpdateInf>();
    // const [update, setUpdate] = useState(false);
    // const [aa, setAA] = useState();

    const fetchProduct = async () => {
        return await ProductAPI.getProduct(pid);
    };
    useEffect(() => {
        if (pid) {
            fetchProduct().then((response) => {
                console.log("response", response);
                setProduct(response.data.product);
            });
        }
    }, [pid]);
    useEffect(() => {}, [product]);

    const fetchResUpdate = async (data: FormData) => {
        let response = await ProductAPI.updateProduct(data);
        if (response) {
            SweetAlert2.updateSuccess();
        }
    };

    const onUpdate = async (product: ProductUpdateInf) => {
        console.log("PRODUCT UPDATE", product);
        let formData = new FormData();
        Object.keys(product).map((key) => {
            let data = product[key as keyof ProductUpdateInf]?.toString();
            if (key === "colors") {
                product[key]?.forEach((element) => {
                    formData.append("colors[]", element);
                });
            } else {
                formData.append(key, data || "");
            }

            // if (key === 'image') {
            //   formData.append('image', product.image!);
            // } else {
            //   formData.append(key, data || '');
            // }
        });
        await fetchResUpdate(formData);
    };

    return (
        <>
            <FormInputProduct
                product={product}
                title={"Update Product"}
                btnTitle={"Update"}
                callback={onUpdate}
                type={"update"}
            ></FormInputProduct>
        </>
    );
};

export default ViewProduct;
