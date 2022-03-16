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
  const [formData, setFormData] = useState<formProps>();
  const getDropFile = (file: File) => {
    // console.log("GET DROPFILE", file);
    setFormData({
      ...formData,
      ["productImage"]: file,
    });
  };
  const onFormChange = (event: any, type: string) => {
    let target = event.target.value;
    setFormData({
      ...formData,
      [type]: target,
    });
  };
  const onCreate = async () => {
    if (formData?.productHashTag && formData?.productName && formData?.productPrice && formData?.productDescription && formData.productImage) {
      let form = new FormData();
      const hashTag = formData?.productHashTag?.replace(/#|_/g, "");
      const hashTagArr = hashTag?.split(" ");
      form.append("title", formData?.productName || "");
      form.append("description", formData?.productDescription || "");
      form.append("price", formData?.productPrice || "");
      hashTagArr?.map((instance) => {
        form.append("hashtag", instance || "");
      });
      form.append("image", formData?.productImage || "");
      let response = await ProductAPI.createProduct(form);
      if (response) {
        window.alert("CREATE PRODUCT SUCCESS");
      }
      // if (response.status === 200) {
      //   window.alert("CREATE PRODUCT SUCCESS");
      // }
    } else {
      let status = "";
      if (!formData?.productName) {
        status += "Missing Product Name ,";
      }
      if (!formData?.productDescription) {
        status += "Missing Description ,";
      }
      if (!formData?.productPrice) {
        status += "Missing Price ,";
      }
      if (!formData?.productImage) {
        status += "Missing Image ,";
      }
      if (!formData?.productHashTag) {
        status += "Missing HashTag ,";
      }

      window.alert(`Missing Fields :  ${status}`);
    }
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
