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

  const fetchProduct = async () => {
    return await ProductAPI.getProduct(pid);
  };
  const updateProduct = () => {
    // setReRender(!reRender);
  };
  useEffect(() => {
    if (product) {
      setProduct(product);
    }
  }, [product]);
  useEffect(() => {
    if (pid) {
      fetchProduct().then(response => {
        console.log('response', response);
        setProduct(response.data.product);
      });
    }
  }, [pid]);

  const fetchResUpdate = async (data: FormData) => {
    let response = await ProductAPI.updateProduct(data);
    if (response) {
      SweetAlert2.updateSuccess();
    }
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
        title={'Hello'}
        btnTitle={'Update'}
        callback={onUpdate}
        type={'update'}
        updateProduct={updateProduct}
      ></FormInputProduct>
    </>
  );
};

export default ViewProduct;
