import React, { useState, useEffect } from "react";
import { Group, Input, Button, Container, TextInput, Textarea, Select } from "@mantine/core";
import styled from "styled-components";
import { Search } from "tabler-icons-react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import SweetAlert2 from "../../../utils/sweetAlert";
import { useRouter } from "next/router";
const Wrapper = styled.div``;
const ShopeeCreate = () => {
    const [url, setUrl] = useState("");
    const [product, setProduct] = useState<any>();
    const [data, setData] = useState([{ value: "sadasdasda", label: "adsadasdas" }]);
    const [tag, setTag] = useState<string[]>([]);
    const router = useRouter();

    const handleParseUrl = async () => {
        const ShopeeAPI = (await import("../../../api/crawler")).default;
        let response = await ShopeeAPI.getProductByURL(url);
        setProduct(response.data.products.data);
    };
    const onCreateProductShopee = async () => {
        const ShopeeAPI = (await import("../../../api/crawler")).default;
        if (product) {
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
                affilate: url,
                tag: tag,
            };
            let response = await ShopeeAPI.createProductByShopee(shopeeProduct);
            if (response) {
                SweetAlert2.createSuccess(() => {
                    // router.push("/shopee/products");
                });
            }
        }
    };

    return (
        <Wrapper>
            <Container>
                <Group position="center">
                    <Input
                        icon={<Search />}
                        placeholder="Url parse"
                        style={{ flexGrow: "1" }}
                        onChange={(event: any) => {
                            setUrl(event.currentTarget.value);
                        }}
                    />
                    <Button style={{ width: "120px" }} onClick={() => handleParseUrl()}>
                        Get Product
                    </Button>
                </Group>
                <br />
                <TextInput
                    readOnly
                    placeholder="Tên sản phẩm "
                    label="Tên sản phẩm"
                    value={product ? product.name : ""}
                    required
                />
                <br />
                <TextInput
                    readOnly
                    value={product ? product.price : ""}
                    placeholder="Price"
                    label="Price"
                    required
                />
                <br />
                <Select
                    readOnly
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
                    label="Nhập tag "
                    onChange={(event) => {
                        let arrTag: string[] = event.target.value.trim().split(" ");
                        setTag(arrTag);
                    }}
                    required
                    minRows={2}
                    maxRows={4}
                />
                <br />

                <TextInput
                    readOnly
                    placeholder="Affilate Link"
                    label="Affilate Link"
                    value={url}
                    required
                />
                <br />
                <Button
                    fullWidth
                    onClick={() => {
                        onCreateProductShopee();
                    }}
                >
                    {" "}
                    Tạo sản phẩm từ shopee
                </Button>
            </Container>
        </Wrapper>
    );
};

export default ShopeeCreate;
