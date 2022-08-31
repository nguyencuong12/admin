import React, { useState, useEffect } from "react";
import {
    Group,
    Input,
    Button,
    Container,
    TextInput,
    Textarea,
    Select,
    Stepper,
    Grid,
    NavLink,
} from "@mantine/core";
import styled from "styled-components";
import { Search, ArrowLeft, ArrowDown, ArrowRight } from "tabler-icons-react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import SweetAlert2 from "../../../utils/sweetAlert";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";

const Wrapper = styled.div``;
const CategoriesWrapper = styled(Grid)`
    min-height: 300px;
`;

const ShopeeCreate = () => {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const [url, setUrl] = useState("");
    const [product, setProduct] = useState<any>();
    const [tag, setTag] = useState<string[]>([]);
    const [categories, setCategories] = useState<any>([]);
    const [subCategory1, setSubCategory1] = useState<string[]>([]);
    const [active1, setActive1] = useState<any>();
    const [active2, setActive2] = useState<any>();
    const data1 = [
        { icon: "", label: "Sản phẩm cho mèo" },
        { icon: "", label: "Sản phẩm cho chó" },
    ];
    const handleParseUrl = async () => {
        const ShopeeAPI = (await import("../../../api/crawler")).default;
        let response = await ShopeeAPI.getProductByURL(url);
        setProduct(response.data.products.data);
    };
    useEffect(() => {
        if (product && active == 0) {
            nextStep();
        }
    }, [product]);
    useEffect(() => {
        if (categories) {
            console.log("CATE", categories);
        }
    }, [categories]);
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
                <Stepper active={active} onStepClick={setActive} breakpoint="sm">
                    <Stepper.Step
                        label="First step"
                        description="Parse Product From URL "
                        allowStepSelect={active > 0}
                    >
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
                    </Stepper.Step>
                    <Stepper.Step
                        label="Second step"
                        description="Verify email"
                        allowStepSelect={active > 1}
                    >
                        <CategoriesWrapper gutter="lg">
                            <Grid.Col xl={6} style={{ border: "1px solid #ccc" }}>
                                {data1.map((instance, index) => {
                                    return (
                                        <NavLink
                                            key={index}
                                            label={instance.label}
                                            rightSection={<ArrowRight size={12}></ArrowRight>}
                                            active={index == active1}
                                            onClick={() => {
                                                const checkExist = categories.find(
                                                    (element: any) =>
                                                        element.display_name === instance.label
                                                );

                                                switch (instance.label) {
                                                    case "Sản phẩm cho mèo": {
                                                        setSubCategory1([
                                                            "Hạt cho mèo",
                                                            "Pate cho mèo",
                                                            "Súp thưởng cho mèo",
                                                            "Tã lót cho mèo",
                                                            "Khay vệ sinh cho mèo",
                                                            "Xịt khử mùi cho mèo",
                                                            "Cát vệ sinh cho mèo",
                                                            "Balo cho mèo",
                                                            "Túi đeo cho mèo",
                                                            "Gel dinh dưỡng cho mèo",
                                                            "Vòng cổ trị rận cho mèo",
                                                            "Vitamin cho mèo",
                                                            "Chuồng",
                                                        ]);
                                                        break;
                                                    }
                                                    case "Sản phẩm cho chó": {
                                                        setSubCategory1([
                                                            "Hạt cho chó",
                                                            "Pate cho chó",
                                                            "Tã lót cho chó",
                                                            "Khay vệ sinh cho chó",
                                                            "Xịt khử mùi cho chó",
                                                            "Balo cho chó",
                                                            "Túi đeo cho chó",
                                                            "Gel dinh dưỡng cho chó",
                                                            "Vòng cổ trị rận cho chó",
                                                            "Vitamin cho chó",
                                                            "Chuồng",
                                                        ]);
                                                        break;
                                                    }
                                                    default: {
                                                        break;
                                                    }
                                                }
                                                if (!checkExist) {
                                                    let newCategories = {
                                                        catid: uuidv4(),
                                                        display_name: instance.label,
                                                        no_sub: false,
                                                        is_default_subcat: false,
                                                    };
                                                    product.categories = [
                                                        ...product.categories,
                                                        newCategories,
                                                    ];
                                                    setCategories([...categories, newCategories]);
                                                }

                                                setActive1(index);
                                            }}
                                        ></NavLink>
                                    );
                                })}
                            </Grid.Col>
                            <Grid.Col xl={6} style={{ border: "1px solid #ccc" }}>
                                {subCategory1.map((subItems, index) => {
                                    return (
                                        <NavLink
                                            key={index}
                                            label={subItems}
                                            rightSection={<ArrowRight size={12}></ArrowRight>}
                                            active={index == active2}
                                            onClick={() => {
                                                const checkExist = categories.find(
                                                    (element: any) =>
                                                        element.display_name === subItems
                                                );

                                                if (!checkExist) {
                                                    let newCategories = {
                                                        catid: uuidv4(),
                                                        display_name: subItems,
                                                        no_sub: false,
                                                        is_default_subcat: false,
                                                    };

                                                    product.categories = [
                                                        ...product.categories,
                                                        newCategories,
                                                    ];
                                                    setCategories([...categories, newCategories]);
                                                }
                                                setActive2(index);
                                            }}
                                        ></NavLink>
                                    );
                                })}
                            </Grid.Col>
                        </CategoriesWrapper>
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
                        <TextInput
                            // value={product ? product.categories : ""}
                            placeholder="Categories"
                            label="Categories"
                            required
                            onChange={(event) => {
                                let newCategories = {
                                    catid: uuidv4(),
                                    display_name: event.target.value,
                                    no_sub: false,
                                    is_default_subcat: false,
                                };
                                setCategories(newCategories);
                            }}
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
                    </Stepper.Step>
                    <Stepper.Step
                        label="Final step"
                        description="Get full access"
                        allowStepSelect={active > 2}
                    >
                        <Button
                            size={"lg"}
                            fullWidth
                            onClick={() => {
                                onCreateProductShopee();
                            }}
                        >
                            Tạo sản phẩm từ shopee
                        </Button>
                    </Stepper.Step>
                    <Stepper.Completed>
                        Completed, click back button to get to previous step
                    </Stepper.Completed>
                </Stepper>

                <Group position="center" mt="xl">
                    <Button
                        variant="default"
                        onClick={prevStep}
                        disabled={active == 0 || !product ? true : false}
                    >
                        Quay lại
                    </Button>
                    <Button onClick={nextStep} disabled={!product}>
                        Tiếp tục
                    </Button>
                </Group>
            </Container>
        </Wrapper>
    );
};

export default ShopeeCreate;
