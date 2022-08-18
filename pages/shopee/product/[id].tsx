import React, { useState, useEffect } from "react";

import { Group, Input, Button, Container, TextInput, Textarea, Select } from "@mantine/core";
import styled from "styled-components";
import { Search } from "tabler-icons-react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import { useRouter } from "next/router";

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
    return (
        <Wrapper>
            <Container>
                <br />
                <TextInput
                    readOnly
                    placeholder="Tên sản phẩm "
                    label="Tên sản phẩm"
                    value={product ? product.title : ""}
                    required
                />
                <br />
                <TextInput
                    readOnly
                    placeholder="Price"
                    label="Price"
                    value={product ? product.description : ""}
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
                    readOnly
                    placeholder="Mô tả sản phẩm"
                    label="Mô tả sản phẩm"
                    required
                    value={product ? product.description : ""}
                    autosize
                    minRows={2}
                />
                <br />
                <TextInput
                    readOnly
                    placeholder="Thương Hiệu"
                    label="Thương hiệu"
                    value={product ? product.brand : ""}
                    required
                />
                <br />
                <TextInput
                    readOnly
                    placeholder="Giảm giá"
                    label="Giảm giá"
                    value={product ? product.discount : ""}
                    required
                />

                <br />
                <TextInput
                    readOnly
                    placeholder="Số lượng có trong kho"
                    label="Số lượng có trong kho"
                    value={product ? product.stock : ""}
                    required
                />
                <br />
                <TextInput
                    readOnly
                    placeholder="Địa chỉ"
                    label="Địa chỉ"
                    value={product ? product.shop_location : ""}
                    required
                />
                <br />
                <Textarea
                    placeholder="Tag"
                    label="Nhập tag"
                    value={product ? product.tag : ""}
                    required
                    minRows={2}
                    maxRows={4}
                />
                <br />

                <TextInput
                    readOnly
                    placeholder="Affilate Link"
                    label="Affilate Link"
                    value={product ? product.affilate : ""}
                    // value={url}
                    // value={productShopee ? productShopee.title : ""}
                    required
                />
                <br />
                <Button fullWidth> Chỉnh sửa sản phẩm</Button>
            </Container>
        </Wrapper>
    );
};

export default ShopeeProduct;
