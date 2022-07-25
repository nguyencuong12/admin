import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

import { Textarea, Paper, TextInput, Button, ColorPicker, Group, Badge } from "@mantine/core";
import styled from "styled-components";
import { DropboxComponent } from "../../components";
import { ProductAPI } from "../../api";
import { ProductCreateInf, ProductUpdateInf } from "../../interface";
import { imageOptimizer } from "next/dist/server/image-optimizer";
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
    product?: ProductUpdateInf;
    callback: Function;
    type?: string;
}
const FormProduct = (props: formProductProps) => {
    const { title, btnTitle, callback, product, type } = props;
    // const [formData, setFormData] = useState<ProductInf>();
    // const [products, setProducts] = useState<ProductInf>();
    const [file, setFile] = useState<File>();
    const [listFile, setListFile] = useState<File[]>();
    const [color, setColor] = useState<string>();
    const [colors, setColors] = useState<string[]>([]);
    const form = useForm({
        initialValues: {
            title: "",
            description: "",
            price: "",
            type: "",
            hashtag: "",
            image: [],
            colors: [],
            _id: "",
        },
    });
    useEffect(() => {
        if (product) {
            setIntialValueForm(product);
            console.log("PRODUCT", product);
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
            form.setFieldValue("title", product.title);
            form.setFieldValue("price", product.price);
            form.setFieldValue("description", product.description);
            let regexHashtag = product.hashtag.toString().trim().replace(/,/g, " ");
            form.setFieldValue("hashtag", regexHashtag);
            form.setFieldValue("type", product.type);
            form.setFieldValue("_id", product._id);
            // form.setFieldValue("image", product.image!);
        }
    };

    const getDropFile = (files: File[]) => {
        console.log("files", files);

        setListFile(files);
    };

    useEffect(() => () => setColors([]), []);
    useEffect(() => {
        if (colors) {
            console.log("NGUYEN CUONG", colors);
        }
    }, [colors]);
    const onSubmitForm = (values: any) => {
        let createOptions: ProductCreateInf;
        let updateOptions: ProductUpdateInf;
        let convertStringToArrayFromSpace = values.hashtag!.toString().split(" ");
        // values.hashtag = convertStringToArrayFromSpace;

        switch (type) {
            case "create": {
                delete values["_id"];
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
            case "update": {
                updateOptions = values;
                updateOptions.hashtag = convertStringToArrayFromSpace;
                let options = {
                    ...updateOptions,
                    image: product?.image || listFile,
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
                {colors?.map((value) => {
                    return (
                        <Badge
                            key={value}
                            variant="outline"
                            sx={{ padding: 10, margin: 2, color: "#fff", background: value }}
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
                    <form onSubmit={form.onSubmit((values) => onSubmitForm(values))}>
                        <TextInput
                            placeholder="Product Name"
                            label="Product"
                            required
                            value={form.values.title}
                            onChange={(event) => form.setFieldValue("title", event.target.value)}
                        />
                        <br />
                        <Textarea
                            placeholder="Product Description"
                            label="Description"
                            required
                            value={form.values.description}
                            onChange={(event) =>
                                form.setFieldValue("description", event.target.value)
                            }
                        />
                        <br />
                        <TextInput
                            placeholder="Product Price"
                            label="Price"
                            required
                            value={form.values.price}
                            onChange={(event) => form.setFieldValue("price", event.target.value)}
                        />
                        <br />
                        <TextInput
                            placeholder="Product Type"
                            label="Type"
                            required
                            value={form.values.type}
                            onChange={(event) => form.setFieldValue("type", event.target.value)}
                        />
                        <br />
                        <h5>Product Image:</h5>
                        <DropboxComponent callbackFunc={getDropFile}></DropboxComponent>
                        <br />
                        <strong>FileName: {file?.name}</strong>
                        <br />
                        <br />

                        <Textarea
                            label="Hashtag"
                            placeholder="Hashtag"
                            required
                            value={form.values.hashtag}
                            onChange={(event) => form.setFieldValue("hashtag", event.target.value)}
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
                                    "#25262b",
                                    "#868e96",
                                    "#fa5252",
                                    "#e64980",
                                    "#be4bdb",
                                    "#7950f2",
                                    "#4c6ef5",
                                    "#228be6",
                                    "#15aabf",
                                    "#12b886",
                                    "#40c057",
                                    "#82c91e",
                                    "#fab005",
                                    "#fd7e14",
                                ]}
                                onChange={(color: string) => {
                                    console.log("print color", color);
                                    setColor(color);
                                }}
                            ></ColorPicker>
                            <Button
                                onClick={() => {
                                    if (colors == undefined) {
                                        console.log("PRINT CALL (1)");
                                        setColors([color!]);
                                    } else {
                                        console.log("PRINT CALL (2)");
                                        setColors([...colors!, color!]);
                                    }
                                    console.log("COLORS ADDING ", colors);

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
    throw new Error("Function not implemented.");
}
