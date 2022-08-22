import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import {
    Group,
    Input,
    Button,
    Container,
    TextInput,
    Textarea,
    Select,
    Collapse,
    Badge,
    List,
    ActionIcon,
} from "@mantine/core";
import styled from "styled-components";
import { Search } from "tabler-icons-react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import { useRouter } from "next/router";
import SweetAlert2 from "../../../utils/sweetAlert";
import { FaPlus, FaWindowClose } from "react-icons/fa";

const Wrapper = styled.div``;
const BadgeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
    padding: 10px 0px;
`;
interface propsCategoriesInput {
    open: boolean;
}
const CategoriesInput = styled(TextInput)<propsCategoriesInput>`
    display: ${(props) => (props.open ? "block" : "none")};
`;

const ShopeeProduct = () => {
    const [product, setProduct] = useState<any>();
    const [openCategories, setOpencategories] = useState<boolean>(false);
    const [openTextCategories, setOpenTextCategories] = useState<boolean>(false);
    const [textCategories, setTextCategories] = useState("");
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
        let response = await CrawlerAPI_SHOPEE.updateProductByShopee(product);
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
                <Button
                    onClick={() => {
                        setOpencategories(!openCategories);
                    }}
                >
                    Categories
                </Button>
                <Collapse in={openCategories}>
                    <BadgeWrapper>
                        {product &&
                            product.categories.map((category: any) => {
                                return <Badge key={category.catid}>{category.display_name}</Badge>;
                            })}
                    </BadgeWrapper>
                    <ActionIcon
                        variant="default"
                        size="md"
                        onClick={() => {
                            setOpenTextCategories(!openTextCategories);
                        }}
                    >
                        <FaPlus size={12} />
                    </ActionIcon>
                </Collapse>
                <CategoriesInput
                    open={openTextCategories}
                    placeholder="Thêm danh mục"
                    label="Thêm danh mục"
                    onChange={(event) => {
                        setTextCategories(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                            let objectCategoriesAdd = {
                                catid: uuidv4(),
                                display_name: textCategories,
                                no_sub: false,
                                is_default_subcat: false,
                            };
                            setProduct({
                                ...product,
                                categories: [...product.categories, objectCategoriesAdd],
                            });
                        }
                    }}
                    // style={{ display: "none" }}
                    rightSection={
                        <ActionIcon
                            variant="default"
                            size="md"
                            onClick={() => {
                                setOpenTextCategories(!openTextCategories);
                            }}
                        >
                            <FaWindowClose size={12} />
                        </ActionIcon>
                    }
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
