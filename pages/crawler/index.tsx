import React, { useState, useEffect } from "react";
import { Group, Input, Button, Container, TextInput, Textarea, Select } from "@mantine/core";
import styled from "styled-components";
import { Search } from "tabler-icons-react";
import { ShopeeInf } from "../../interface";
import { keys } from "ts-transformer-keys";

const Wrapper = styled.div``;
const CrawlerComponent = () => {
    const [url, setUrl] = useState("");
    const [product, setProduct] = useState<ShopeeInf>();
    const [data, setData] = useState([{ value: "sadasdasda", label: "adsadasdas" }]);
    // const [selectedData, setSelectedData] = useState({
    //     value: "",
    //     label: "",
    // });

    useEffect(() => {
        if (product) {
            console.log("PRODUCT !!", product);
            let categories: any = [];
            // product.categories.forEach((category: any) => {
            //     categories.push({ value: category.display_name, label: category.dislay_name });
            // });
            // setData(categories);
            // setData([{ value :, label: "asd" }]);
        }
    }, [product]);

    const handleParseUrl = async () => {
        const ShopeeAPI = (await import("../../api/crawler")).default;
        let response = await ShopeeAPI.getProductByID(url);
        setProduct(response.data.products.data);
    };

    // console.log("TEST", test);

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
                    <Button style={{ width: "100px" }} onClick={() => handleParseUrl()}>
                        Parse
                    </Button>
                </Group>
                <br />
                <TextInput
                    placeholder="Tên sản phẩm "
                    label="Tên sản phẩm"
                    value={product && product?.name}
                    required
                />
                <br />
                <TextInput
                    placeholder="Price"
                    label="Price"
                    value={product && product?.price}
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
                    placeholder="Mô tả sản phẩm"
                    label="Mô tả sản phẩm"
                    required
                    value={product && product?.description}
                />
                <br />
                <TextInput
                    placeholder="Thương Hiệu"
                    label="Thương hiệu"
                    value={product && product?.brand}
                    required
                />
                <br />
                <TextInput
                    placeholder="Giảm giá"
                    label="Giảm giá"
                    value={product && product?.discount}
                    required
                />

                <br />
                <TextInput
                    placeholder="Số lượng có trong kho"
                    label="Số lượng có trong kho"
                    value={product && product?.stock}
                    required
                />

                <TextInput
                    placeholder="Địa chỉ"
                    label="Địa chỉ"
                    value={product && product?.shop_location}
                    required
                />
                <br />
                <Button fullWidth>Tạo sản phẩm từ shopee</Button>
            </Container>
        </Wrapper>
    );
};

export default CrawlerComponent;
function forEach(arg0: (key: any, index: any) => void) {
    throw new Error("Function not implemented.");
}
