import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '@mantine/form';

import {
  Textarea,
  Paper,
  TextInput,
  Button,
  ColorPicker,
  Group,
  Badge,
  Grid,
  MantineTheme,
} from '@mantine/core';
import styled from 'styled-components';
import { DropboxComponent } from '../../components';
import { ProductAPI } from '../../api';
import { ProductCreateInf, ProductUpdateInf } from '../../interface';
import { imageOptimizer } from 'next/dist/server/image-optimizer';
import Image from 'next/image';
import { Dropzone, DropzoneStatus } from '@mantine/dropzone';
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
const ImagePreviewItem = styled.div`
  padding: 20px;
  border-radius: 5px;
  border: 1px solid green;
  position: relative;
  overflow: hidden;
  /* :hover .delete {
    border: 1px solid green;
    right: 10px;
  }
  :hover .update {
    right: 10px;
  } */
  :hover .actions {
    left: 10px;
  }
  .actions {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 20px;
    left: -100%;
    transition: left 300ms ease;
  }
  .update {
    z-index: 300;
    padding: 10px 0;
    width: 110px;
  }
  .delete {
    z-index: 300;
    width: 110px;
  }

  :hover {
    /* background: red; */
  }
`;

interface formProductProps {
  title: string;
  btnTitle: string;
  product?: ProductUpdateInf;
  callback: Function;
  type?: string;
  updateProduct?: Function;
}
const FormProduct = (props: formProductProps) => {
  const { title, btnTitle, callback, product, type, updateProduct } = props;

  // const [formData, setFormData] = useState<ProductInf>();
  // const [products, setProducts] = useState<ProductInf>();
  const [file, setFile] = useState<File>();
  const [listFile, setListFile] = useState<File[]>();
  const [color, setColor] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  const openRef = useRef<() => void>(open);
  const [productList, setProductList] = useState<ProductUpdateInf>();
  const [selectImageUpdateByID, setSelectImageUpdate] = useState<string>();
  const [imagesUpdate, setImageUpdate] = useState<any>([]) || [];
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      price: '',
      type: '',
      hashtag: '',
      image: [],
      colors: [],
      _id: '',
    },
  });
  useEffect(() => {
    if (product) {
      setIntialValueForm(product);
      setProductList(product);
      setColors(product?.colors!);
    }
  }, [product]);

  const setIntialValueForm = async (product: ProductUpdateInf) => {
    // const checkUndifinedProduct = product.value(obj);
    if (
      product._id &&
      product.image &&
      product.title &&
      product.price &&
      product.description &&
      product.hashtag &&
      product.type
    ) {
      form.setFieldValue('title', product.title);
      form.setFieldValue('price', product.price);
      form.setFieldValue('description', product.description);
      let regexHashtag = product.hashtag.toString().trim().replace(/,/g, ' ');
      form.setFieldValue('hashtag', regexHashtag);
      form.setFieldValue('type', product.type);
      form.setFieldValue('_id', product._id);
      // form.setFieldValue("image", product.image!);
    }
  };

  const getDropFile = (files: File[]) => {
    console.log('files', files);

    setListFile(files);
  };

  const onHandleProductImage = (type: string, imageID: string) => {
    switch (type) {
      case 'update': {
        setSelectImageUpdate(imageID);

        break;
      }
      case 'delete': {
        break;
      }
    }
  };

  useEffect(() => () => setColors([]), []);
  useEffect(() => {
    if (colors) {
      console.log('NGUYEN CUONG', colors);
    }
  }, [colors]);
  const onSubmitForm = (values: any) => {
    let createOptions: ProductCreateInf;
    let updateOptions: ProductUpdateInf;
    let convertStringToArrayFromSpace = values.hashtag!.toString().split(' ');
    // values.hashtag = convertStringToArrayFromSpace;

    switch (type) {
      case 'create': {
        delete values['_id'];
        createOptions = values;
        createOptions.hashtag = convertStringToArrayFromSpace;
        let options = {
          ...createOptions,
          image: product?.image || listFile,
          colors: colors,
        };
        callback(options);
        break;
      }
      case 'update': {
        updateOptions = values;
        updateOptions.hashtag = convertStringToArrayFromSpace;
        console.log('IMAGE UPDATE', imagesUpdate);
        let options = {
          ...updateOptions,
          // image: product?.image || listFile,
          imageUpdate: imagesUpdate,
          colors: colors,
        };
        callback(options);
        break;
      }
      default: {
        break;
      }
    }

    // console.log("OPTIONS", options);
    // callback(options);
  };
  function RenderColors() {
    return (
      <div>
        {colors?.map(value => {
          return (
            <Badge
              key={value}
              variant="outline"
              sx={{ padding: 10, margin: 2, color: '#fff', background: value }}
              // rightSection={removeButton}
            >
              Colors
            </Badge>
          );
        })}
      </div>
    );
  }
  return (
    <InputWrapper>
      <Paper shadow="lg" radius="md" p="md">
        <h2>{title}</h2>
        <Content>
          <form onSubmit={form.onSubmit(values => onSubmitForm(values))}>
            <TextInput
              placeholder="Product Name"
              label="Product"
              required
              value={form.values.title}
              onChange={event =>
                form.setFieldValue('title', event.target.value)
              }
            />
            <br />
            <Textarea
              placeholder="Product Description"
              label="Description"
              required
              value={form.values.description}
              onChange={event =>
                form.setFieldValue('description', event.target.value)
              }
            />
            <br />
            <TextInput
              placeholder="Product Price"
              label="Price"
              required
              value={form.values.price}
              onChange={event =>
                form.setFieldValue('price', event.target.value)
              }
            />
            <br />
            <TextInput
              placeholder="Product Type"
              label="Type"
              required
              value={form.values.type}
              onChange={event => form.setFieldValue('type', event.target.value)}
            />
            <br />
            {type === 'create' && (
              <>
                <h5>Product Image:</h5>
                <DropboxComponent callbackFunc={getDropFile}></DropboxComponent>
                <br />
              </>
            )}
            <Dropzone
              multiple={false}
              style={{ display: 'none' }}
              onDrop={files => {
                var arrFile: File;
                product?.image?.forEach(item => {
                  if (item.id === selectImageUpdateByID) {
                    files.map(file => {
                      var type = file.type;
                      var blob = file.slice(0, file.size, type);
                      var newFile = new File(
                        [blob],
                        item.id + '.' + type.split('/')[1],
                        { type: type }
                      );

                      item.path = '/' + newFile.name;
                      arrFile = newFile;
                    });

                    if (imagesUpdate) {
                      console.log('ARR CORRECT', arrFile);
                      setImageUpdate([...imagesUpdate, arrFile]);
                    } else {
                      console.log('ARR ELSE', arrFile);
                      setImageUpdate(arrFile);
                    }
                  }
                });
                updateProduct!();
                // console.log("product", product);
                // setProductList(product);
              }}
              openRef={openRef}
            >
              {status => <></>}
            </Dropzone>

            {type === 'update' && (
              <div className="img-preview">
                <h4>Image Preview:</h4>
                <Grid>
                  {product &&
                    product.image?.map(item => {
                      // return <h1>AAA</h1>;
                      return (
                        <Grid.Col md={4} key={item.id}>
                          <ImagePreviewItem>
                            <div>{item.path}</div>
                            <div className="actions">
                              <div className="update">
                                <Button
                                  size={'xs'}
                                  fullWidth
                                  color={'green'}
                                  onClick={() => {
                                    openRef.current();
                                    onHandleProductImage('update', item.id);
                                  }}
                                >
                                  Chỉnh Sửa
                                </Button>
                              </div>
                              <div className="delete">
                                <Button
                                  fullWidth
                                  size={'xs'}
                                  color={'red'}
                                  onClick={() => {
                                    onHandleProductImage('delete', item.id);
                                  }}
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>

                            <Image
                              height={30}
                              width={50}
                              layout="responsive"
                              objectFit="contain"
                              src={item.path}
                            ></Image>
                          </ImagePreviewItem>
                        </Grid.Col>
                      );
                    })}
                  {/* <Grid.Col md = {6}></Grid.Col>
                              
                              <Grid.Col md = {6}></Grid.Col> */}
                </Grid>
                {/* {product?.image[0].path} */}
              </div>
            )}
            <br />
            <strong>FileName: {file?.name}</strong>
            <br />
            <br />

            <Textarea
              label="Hashtag"
              placeholder="Hashtag"
              required
              value={form.values.hashtag}
              onChange={event =>
                form.setFieldValue('hashtag', event.target.value)
              }
            />
            <br />

            <div className="colors">
              <Group>
                <RenderColors></RenderColors>
              </Group>
            </div>
            <br />
            <Group>
              <ColorPicker
                swatches={[
                  '#25262b',
                  '#868e96',
                  '#fa5252',
                  '#e64980',
                  '#be4bdb',
                  '#7950f2',
                  '#4c6ef5',
                  '#228be6',
                  '#15aabf',
                  '#12b886',
                  '#40c057',
                  '#82c91e',
                  '#fab005',
                  '#fd7e14',
                ]}
                onChange={(color: string) => {
                  console.log('print color', color);
                  setColor(color);
                }}
              ></ColorPicker>
              <Button
                onClick={() => {
                  if (colors == undefined) {
                    console.log('PRINT CALL (1)');
                    setColors([color!]);
                  } else {
                    console.log('PRINT CALL (2)');
                    setColors([...colors!, color!]);
                  }
                  console.log('COLORS ADDING ', colors);

                  // setColors([...colors!, color!]);
                }}
              >
                Add Colors
              </Button>
            </Group>

            <br />
            <Button type="submit" fullWidth>
              {btnTitle}
            </Button>
          </form>
        </Content>
      </Paper>
    </InputWrapper>
  );
};

export default FormProduct;
function componentWillUnmount() {
  throw new Error('Function not implemented.');
}
