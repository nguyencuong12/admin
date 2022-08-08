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
  MultiSelect,
} from '@mantine/core';
import styled from 'styled-components';
import { DropboxComponent } from '../../components';
import { ProductCreateInf, ProductUpdateInf } from '../../interface';
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
  callback?: Function;
  type?: string;
  updateProduct?: Function;
  callbackUpdateProduct?: Function;
  onHandleDeleteProductImage?: Function;
}
const FormProduct = (props: formProductProps) => {
  const {
    title,
    btnTitle,
    callback,
    product,
    type,
    callbackUpdateProduct,
    onHandleDeleteProductImage,
  } = props;

  // const [formData, setFormData] = useState<ProductInf>();
  // const [products, setProducts] = useState<ProductInf>();
  const [file, setFile] = useState<File>();
  const [listFile, setListFile] = useState<File[]>([]);
  const [color, setColor] = useState<string>();
  const [colors, setColors] = useState<string[]>([]);
  //   const [categories, setCategories] = useState<string[]>([]);
  const openRef = useRef<() => void>(null);
  const [selectImageUpdateByID, setSelectImageUpdate] = useState<string>();
  const [imagesUpdate, setImageUpdate] = useState<any>([]) || [];
  const data = [
    { value: 'day-gas', label: 'Dây Gas' },
    { value: 'gas-anhkiet', label: 'Gas Anh Kiệt' },
    { value: 'bep-gas', label: 'Bếp Gas' },
  ];

  interface FormValues {
    title: string;
    description: string;
    price: string;
    type: string;
    hashtag: string;
    image: string[];
    // colors: string[];
    categories: string[];
    _id: string;
  }
  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      description: '',
      price: '',
      type: '',
      hashtag: '',
      image: [],
      //   colors: [],
      categories: [],
      _id: '',
    },
  });
  useEffect(() => {
    if (product) {
      setIntialValueForm(product);
      setColors(product?.colors!);
    }
  }, [product]);

  const setIntialValueForm = async (product: ProductUpdateInf) => {
    // if (
    //   product._id &&
    //   product.image &&
    //   product.title &&
    //   product.price &&
    //   product.description &&
    //   product.hashtag &&
    //   product.type
    // ) {
    //   form.setFieldValue('title', product.title);
    //   form.setFieldValue('price', product.price);
    //   form.setFieldValue('description', product.description);
    //   let regexHashtag = product.hashtag.toString().trim().replace(/,/g, ' ');
    //   form.setFieldValue('hashtag', regexHashtag);
    //   form.setFieldValue('type', product.type);
    //   form.setFieldValue('_id', product._id);
    // }

    if (product !== null) {
      form.setFieldValue('title', product.title!);
      form.setFieldValue('price', product.price!);
      form.setFieldValue('description', product.description!);
      let regexHashtag = product.hashtag!.toString().trim().replace(/,/g, ' ');
      form.setFieldValue('hashtag', regexHashtag);
      form.setFieldValue('type', product.type!);
      form.setFieldValue('categories', product.categories!);
      form.setFieldValue('_id', product._id!);
    }
  };

  const getDropFile = (files: File[]) => {
    // console.log("files", files);
    console.log('FILES,', files);
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
        callback!(options);
        break;
      }
      case 'update': {
        console.log('update', product);
        updateOptions = values;
        updateOptions.hashtag = convertStringToArrayFromSpace;
        let options = {
          ...updateOptions,
          imageUpdate: imagesUpdate,
          image: product!.image,
          colors: colors,
        };
        callbackUpdateProduct!(options);
        break;
      }
      default: {
        break;
      }
    }

    // console.log("OPTIONS", options);
    // callback(options);
  };

  const onDeleteImage = (productID: String) => {
    if (product!.image!.length > 1) {
      product?.image?.forEach((item, index) => {
        if (item.id == productID) {
          product.image?.splice(index, 1);
          onHandleDeleteProductImage!(product);
          // console.log("DELETE PRODUCT", product);
        }
      });
    } else {
      alert(
        'Không thể xóa hình ảnh mỗi sản phẩm phải có ít nhất 1 hình ảnh mô tả !!!'
      );
    }
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
              placeholder="Nhập tên sản phẩm"
              label="Tên sản phẩm"
              required
              value={form.values.title}
              onChange={event =>
                form.setFieldValue('title', event.target.value)
              }
            />
            <br />

            <Textarea
              placeholder="Mô tả ngắn về sản phẩm"
              label="Nhập Mô tả ngắn về sản phẩm"
              required
              value={form.values.description}
              onChange={event =>
                form.setFieldValue('description', event.target.value)
              }
            />
            <br />
            <TextInput
              placeholder="Giá sản phẩm"
              label="Nhập Giá sản phẩm"
              required
              value={form.values.price}
              onChange={event =>
                form.setFieldValue('price', event.target.value)
              }
            />
            <br />
            {/* <TextInput
              placeholder="Loại sản phẩm"
              label="Nhập loại sản phẩm"
              required
              value={form.values.type}
              onChange={event => form.setFieldValue('type', event.target.value)}
            />
            <br /> */}
            <MultiSelect
              data={data}
              value={form.values.categories}
              onChange={_categories => {
                form.setFieldValue('categories', _categories);
              }}
              //   value={['react']}
              label="Phân loại hàng"
              placeholder="Chọn phân loại hàng"
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
              multiple={true}
              style={{ display: 'none' }}
              onDrop={files => {
                console.log('DROP CALL NE ', files);
                setFile(files[0]);
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
                      let url = URL.createObjectURL(files[0]);
                      item.path = url;
                      // item.path = "/" + newFile.name;
                      arrFile = newFile;
                    });
                    if (imagesUpdate) {
                      setImageUpdate([...imagesUpdate, arrFile]);
                    } else {
                      setImageUpdate(arrFile);
                    }
                  }
                });
              }}
              openRef={openRef}
            >
              {status => <></>}
            </Dropzone>

            {type === 'update' && (
              <div className="img-preview">
                <h4>Các Hình Ảnh:</h4>
                <Grid>
                  {product &&
                    product.image?.map(item => {
                      // return <h1>AAA</h1>;
                      return (
                        <Grid.Col md={4} key={item.id}>
                          <ImagePreviewItem>
                            <div className="actions">
                              <div className="update">
                                <Button
                                  size={'xs'}
                                  fullWidth
                                  color={'green'}
                                  onClick={() => {
                                    if (null != openRef.current) {
                                      openRef.current();
                                    }

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
                                  onClick={async () => {
                                    onDeleteImage(item.id);
                                    // await ProductAPI.deleteImagesProduct(
                                    //     product._id!,
                                    //     item.id
                                    // );
                                  }}
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>
                            <img
                              src={item.path}
                              style={{
                                objectFit: 'cover',
                                height: '200px',
                                width: '200px',
                              }}
                            ></img>
                          </ImagePreviewItem>
                        </Grid.Col>
                      );
                    })}
                </Grid>
              </div>
            )}
            <br />
            <strong>Tên hình ảnh: {file?.name}</strong>
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

            {/* <div className="colors">
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
                Thêm màu sắc cho sản phẩm
              </Button>
            </Group> */}

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
