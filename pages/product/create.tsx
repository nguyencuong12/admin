import React, { useEffect, useState } from "react";
import { Textarea, Paper, Chips, Chip, TextInput, Button } from "@mantine/core";
import styled from "styled-components";
import { DropboxComponent } from "../../components";
import { ProductAPI } from "../../api";
const InputWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 0px;
`;
const createProductPage = () => {
  interface formProps {
    productName?: string;
    productDescription?: string;
    productPrice?: string;
    productImage?: File;
    productHashTag?: string;
  }
  const [image, setImage] = useState<File>();
  const [formData, setFormData] = useState<formProps>();

  const getDropFile = (file: File) => {
    console.log("GET DROPFILE", file);
    setImage(file);
  };
  const onFormChange = (event: any, type: string) => {
    let target = event.target.value;
    setFormData({
      ...formData,
      [type]: target,
    });
  };
  const onCreate = async () => {
    let form = new FormData();
    form.append("productName", formData?.productName || "");
    form.append("productDescription", formData?.productDescription || "");
    form.append("productPrice", formData?.productPrice || "");
    form.append("productHashtag", formData?.productHashTag || "");
    form.append("image", image || "");
    try {
      let response = await ProductAPI.createProduct(form);
      console.log("response", response);
    } catch (err) {
      console.log("err", err);
    }
    // form.append("productName");
    // console.log("FORMDATA", formData);
  };

  return (
    <InputWrapper>
      <Paper shadow="lg" radius="md" p="md">
        <h2>Create Product</h2>
        <Content>
          <TextInput placeholder="Product Name" label="Product" required onChange={(e) => onFormChange(e, "productName")} />
          <Textarea placeholder="Product Description" label="Product Description" onChange={(e) => onFormChange(e, "productDescription")} required />
          <TextInput placeholder="Product Price" label="Product Price" required onChange={(e) => onFormChange(e, "productPrice")} />
          <h5>Product Image:</h5>
          <DropboxComponent callbackFunc={getDropFile}></DropboxComponent>
          <Textarea placeholder="Hashtag" label="Hashtag" required onChange={(e) => onFormChange(e, "productHashTag")} />
          <Button
            onClick={() => {
              onCreate();
            }}
          >
            Create Product
          </Button>
        </Content>
      </Paper>
    </InputWrapper>
  );
};

export default createProductPage;
