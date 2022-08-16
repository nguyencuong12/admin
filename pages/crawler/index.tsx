import React, { useState, useEffect } from 'react';
import {
  Group,
  Input,
  Button,
  Container,
  TextInput,
  Textarea,
  Select,
} from '@mantine/core';
import styled from 'styled-components';
import { Search } from 'tabler-icons-react';
import { ShopeeInf } from '../../interface';
import { ProductAPI } from '../../api';

const Wrapper = styled.div``;
const CrawlerComponent = () => {
  const [url, setUrl] = useState('');
  const [product, setProduct] = useState<any>();
  const [productShopee, setProductShopee] = useState<ShopeeInf>();
  const [data, setData] = useState([
    { value: 'sadasdasda', label: 'adsadasdas' },
  ]);
  // const [selectedData, setSelectedData] = useState({
  //     value: "",
  //     label: "",
  // });

  useEffect(() => {
    if (product) {
      console.log('PRODUCT !!', product);
      let shopeeProduct = {
        itemid: product.itemid,
        title: product.name,
        description: product.description,
        shopid: product.shopid,
        shop_location: product.shop_location,
        image: product.image,
        images: product.images,
        stock: product.stock,
        price: product.price,
        categories: product.categories,
        brand: product.brand,
        discount: product.discount,
        attributes: product.attributes,
      };
      console.log('SHOPEE PRODUCT', shopeeProduct);

      setProductShopee(shopeeProduct);
      // product.categories.forEach((category: any) => {
      //     categories.push({ value: category.display_name, label: category.dislay_name });
      // });
      // setData(categories);
      // setData([{ value :, label: "asd" }]);
    }
  }, [product]);

  const handleParseUrl = async () => {
    const ShopeeAPI = (await import('../../api/crawler')).default;
    let response = await ShopeeAPI.getProductByID(url);
    setProduct(response.data.products.data);
  };
  const onCreateProductShopee = async () => {
    const ShopeeAPI = (await import('../../api/crawler')).default;
    if (productShopee) {
      let response = await ShopeeAPI.createProductByShopee(productShopee);
      console.log('response shopee create', response);
    }
  };
  // console.log("TEST", test);

  return (
    <Wrapper>
      <Container>
        <Group position="center">
          <Input
            icon={<Search />}
            placeholder="Url parse"
            style={{ flexGrow: '1' }}
            onChange={(event: any) => {
              setUrl(event.currentTarget.value);
            }}
          />
          <Button style={{ width: '100px' }} onClick={() => handleParseUrl()}>
            Parse
          </Button>
        </Group>
        <br />
        <TextInput
          readOnly
          placeholder="Tên sản phẩm "
          label="Tên sản phẩm"
          value={productShopee ? productShopee.title : ''}
          required
        />
        <br />
        <TextInput
          readOnly
          placeholder="Price"
          label="Price"
          value={productShopee ? productShopee.price : ''}
          required
        />
        <br />
        <Select
          label="Categories"
          placeholder="Pick one"
          // data={[

          data={data}
        />
        <br />
        <Textarea
          readOnly
          placeholder="Mô tả sản phẩm"
          label="Mô tả sản phẩm"
          required
          value={productShopee ? productShopee.description : ''}
          minRows={2}
          maxRows={4}
        />
        <br />
        <TextInput
          readOnly
          placeholder="Thương Hiệu"
          label="Thương hiệu"
          value={productShopee ? productShopee.brand : ''}
          required
        />
        <br />
        <TextInput
          readOnly
          placeholder="Giảm giá"
          label="Giảm giá"
          value={productShopee ? productShopee.discount : ''}
          required
        />

        <br />
        <TextInput
          readOnly
          placeholder="Số lượng có trong kho"
          label="Số lượng có trong kho"
          value={productShopee ? productShopee.stock : ''}
          required
        />

        <TextInput
          readOnly
          placeholder="Địa chỉ"
          label="Địa chỉ"
          value={productShopee ? productShopee.shop_location : ''}
          required
        />
        <br />
        <Button
          fullWidth
          onClick={() => {
            onCreateProductShopee();
          }}
        >
          {' '}
          Tạo sản phẩm từ shopee
        </Button>
      </Container>
    </Wrapper>
  );
};

export default CrawlerComponent;
