import React, { useState, useEffect } from "react";

import { Group, Input, Button, Container, TextInput, Textarea, Select } from "@mantine/core";
import styled from "styled-components";
import { Search } from "tabler-icons-react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import { useRouter } from "next/router";
import SweetAlert2 from "../../../utils/sweetAlert";

const Wrapper = styled.div``;
const ShopeeProduct = () => {
    const [product, setProduct] = useState<any>();
    const router = useRouter();

    const { id } = router.query;
    useEffect(() => {
        if (id) {
            fetchProductByItemID();
        }
    }, [id]);
    const fetchProductByItemID = async () => {
        let response = await CrawlerAPI_SHOPEE.fetchProductFromItemID(id);
        setProduct(response.data.product);
        // setProduct(response.data.product);
    };
    const onHandleUpdateProduct = async () => {
        console.log("CALL UPDATE !!!", product);
        let response = await CrawlerAPI_SHOPEE.updateProductByShopee(product);
        console.log("response update", response);
        if (response) {
            SweetAlert2.updateSuccess(() => {
                router.push("/shopee/products");
            });
        }
    };
    return (
        <Wrapper>
            <Container>
                <br />
                <TextInput
                    placeholder="Tên sản phẩm "
                    label="Tên sản phẩm"
                    defaultValue={product ? product.title : ""}
                    onChange={(event) => {
                        product.title = event.target.value;
                    }}
                    required
                />
                <br />
                <TextInput
                    placeholder="Price"
                    label="Price"
                    defaultValue={product ? product.price : ""}
                    onChange={(event) => {
                        product.price = event.target.value;
                    }}
                    required
                />
                <br />
                <Select
                    label="Categories"
                    placeholder="Pick one"
                    // data={[
                    data={[]}
                />
                <br />
                <Textarea
                    placeholder="Mô tả sản phẩm"
                    label="Mô tả sản phẩm"
                    required
                    defaultValue={product ? product.description : ""}
                    onChange={(event) => {
                        product.description = event.target.value;
                    }}
                    autosize
                    minRows={2}
                />
                <br />
                <TextInput
                    placeholder="Thương Hiệu"
                    label="Thương hiệu"
                    defaultValue={product ? product.brand : ""}
                    onChange={(event) => {
                        product.brand = event.target.value;
                    }}
                    required
                />
                <br />
                <TextInput
                    placeholder="Giảm giá"
                    label="Giảm giá"
                    defaultValue={product ? product.discount : ""}
                    onChange={(event) => {
                        product.discount = event.target.value;
                    }}
                    required
                />

                <br />
                <TextInput
                    placeholder="Số lượng có trong kho"
                    label="Số lượng có trong kho"
                    defaultValue={product ? product.stock : ""}
                    onChange={(event) => {
                        product.stock = event.target.value;
                    }}
                    required
                />
                <br />
                <TextInput
                    placeholder="Địa chỉ"
                    label="Địa chỉ"
                    defaultValue={product ? product.shop_location : ""}
                    onChange={(event) => {
                        product.shop_location = event.target.value;
                    }}
                    required
                />
                <br />
                <Textarea
                    placeholder="Tag"
                    label="Nhập tag"
                    defaultValue={product ? product.tag.toString().replaceAll(",", " ") : ""}
                    onChange={(event) => {
                        let arrTag: string[] = event.target.value.trim().split(" ");
                        product.tag = arrTag;
                    }}
                    required
                    minRows={2}
                    maxRows={4}
                />
                <br />

                <TextInput
                    placeholder="Affilate Link"
                    label="Affilate Link"
                    defaultValue={product ? product.affilate : ""}
                    onChange={(event) => {
                        product.affilate = event.target.value;
                    }}
                    // value={url}
                    // value={productShopee ? productShopee.title : ""}
                    required
                />
                <br />
                <Button fullWidth onClick={() => onHandleUpdateProduct()}>
                    Chỉnh sửa sản phẩm
                </Button>
            </Container>
        </Wrapper>
    );
};

export default ShopeeProduct;
