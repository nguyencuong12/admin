import React, { useEffect, useState } from "react";
import { Textarea, Paper, Chips, Chip, TextInput, Button } from "@mantine/core";
import styled from "styled-components";
import { DropboxComponent } from "../../components";
import { ProductAPI } from "../../api";
import { createProductInf, ProductInf } from "../../interface";
// import { keys } from "ts-transformer-keys";

const InputWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
`;
interface formProductProps {
  title: string;
  btnTitle: string;
  product?: ProductInf;
  callback: Function;
}
const formProduct = (props: formProductProps) => {
  const { title, btnTitle, callback, product } = props;
  const [formData, setFormData] = useState<ProductInf>();

  useEffect(() => {
    if (product) {
      let productLength = product.hashtag?.length;
      let hashtagString: string = "";
      for (let i = 0; i < productLength!; i++) {
        hashtagString += "#" + product.hashtag![i];
      }
      var hashTag: string = hashtagString.substring(1);
      //REMOVE FIEST CHARACTER IS SPACE ~!!!!
      setFormData({
        ...product,
        hashtag: hashTag,
        // hashtag: hashtagString,
      });
    }
  }, [product]);

  const getDropFile = (file: File) => {
    setFormData({
      ...formData,
      ["image"]: file,
    });
  };
  const onFormChange = (event: any, type: string) => {
    let target = event.target.value;
    setFormData({
      ...formData,
      [type]: target,
    });
  };

  return (
    <InputWrapper>
      <Paper shadow="lg" radius="md" p="md">
        <h2>{title}</h2>
        <Content>
          <TextInput placeholder="Product Name" label="Product" value={formData?.title ? formData?.title : ""} required onChange={(e) => onFormChange(e, "title")} />
          <Textarea placeholder="Product Description" value={formData?.description ? formData?.description : ""} label="Product Description" onChange={(e) => onFormChange(e, "description")} required />
          <TextInput placeholder="Product Price" value={formData?.price ? formData?.price : ""} label="Product Price" required onChange={(e) => onFormChange(e, "price")} />
          <TextInput placeholder="Product Type" value={formData?.type ? formData?.type : ""} label="Product Type" required onChange={(e) => onFormChange(e, "type")} />
          <h5>Product Image:</h5>
          <DropboxComponent callbackFunc={getDropFile}></DropboxComponent>
          <Textarea placeholder="Hashtag" label="Hashtag" value={formData?.hashtag ? formData?.hashtag : ""} required onChange={(e) => onFormChange(e, "hashtag")} />
          <Button
            onClick={() => {
              console.log("FORMDATA", formData?.hashtag);
              callback(formData);
            }}
          >
            {btnTitle}
          </Button>
        </Content>
      </Paper>
    </InputWrapper>
  );
};

export default formProduct;
