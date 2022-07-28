import { useState } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ProductAPI } from '../../api';
import { ProductUpdateInf, sweetAlertInf } from '../../interface';
import { FormInputProduct } from '../../components';
import alertMessage from '../../components/toast';
import SweetAlert2 from '../../utils/sweetAlert';
const ViewProduct = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState<ProductUpdateInf>();
  const [reRender, setReRender] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      //CALL WHEN PRODUCTS CHANGE
      setProduct(product);
    }
  }, [product]);
  useEffect(() => {
    if (pid) {
      fetchProductByIDAndSave();
      // fetchProductByID().then(response => {
      //   setProduct(response.data.product);
      // });
    }
  }, [pid]);

  const fetchResUpdate = async (data: FormData) => {
    let response = await ProductAPI.updateProduct(data);
    if (response) {
      SweetAlert2.updateSuccess();
    }
  };

  const onHandleUpdate = async () => {
    if (product) {
      let response = await ProductAPI.updateProduct(
        getFormDataForUpdate(product)
      );
      if (response) {
        SweetAlert2.updateSuccess();
      }
    }
  };
  const onHandleUpdateForImage = async () => {};
  const onHandleDeleteForImage = async () => {};
  const onHandleAlertSuccess = async () => {};

  function getFormDataForUpdate(product: ProductUpdateInf): FormData {
    let formData = new FormData();
    Object.keys(product).map(key => {
      let data = product[key as keyof ProductUpdateInf]?.toString();
      if (key === 'colors') {
        product[key]?.forEach(element => {
          formData.append('colors[]', element);
        });
      }
      if (key === 'imageUpdate') {
        product[key]?.forEach(element => {
          formData.append('imageUpdate', element);
        });
        // formData.append('imageUpdate', element);
      } else {
        formData.append(key, data || '');
      }
    });
    return formData;
  }

  const fetchProductByIDAndSave = async () => {
    let response = await ProductAPI.getProduct(pid);
    if (response) setProduct(response.data.product);
  };

  const onUpdate = async (product: ProductUpdateInf) => {
    let formData = new FormData();
    console.log('PRODUCT', product);
    Object.keys(product).map(key => {
      let data = product[key as keyof ProductUpdateInf]?.toString();
      if (key === 'colors') {
        product[key]?.forEach(element => {
          formData.append('colors[]', element);
        });
      }
      if (key === 'imageUpdate') {
        product[key]?.forEach(element => {
          formData.append('imageUpdate', element);
        });
        // formData.append('imageUpdate', element);
      } else {
        formData.append(key, data || '');
      }

      // if (key === 'image') {
      //   formData.append('image', product.image!);
      // } else {
      //   formData.append(key, data || '');
      // }
    });
    let response = await ProductAPI.updateProduct(formData);
    await fetchResUpdate(formData);
  };

  return (
    <>
      <FormInputProduct
        product={product}
        title={'Cập nhật sản phẩm'}
        btnTitle={'Update'}
        callback={onUpdate}
        type={'update'}
        // updateProduct={updateProduct}
      ></FormInputProduct>
    </>
  );
};

export default ViewProduct;
