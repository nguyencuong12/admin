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
    MultiSelect,
} from "@mantine/core";
import styled from "styled-components";
import { Search, ArrowLeft, ArrowDown, ArrowRight } from "tabler-icons-react";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import SweetAlert2 from "../../../utils/sweetAlert";
import Router from "next/router";
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

    interface categoriesInterface {
        catid: number;
        display_name: string;
        no_sub: boolean;
        is_default_subcat: boolean;
    }

    interface productInterface {
        name: string;
        price: number;
        description: string;
        brand: string;
        discount: number;
        stock: number;
        address: string;
        affilateLink: string;
        image: string;
        images: string[];
        categories: any[];
        affilateType: string[];
        hashtag?: string[];
    }
    const [product, setProduct] = useState<productInterface>();
    const [tag, setTag] = useState<string[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [cat, setCat] = useState<any[]>([]);
    const [dog, setDog] = useState<any[]>([]);
    const [mayHutBui, setMayHutBui] = useState<any[]>([]);
    const [robotHutBui, setRobotHutBui] = useState<any[]>([]);
    const categoriesForCat = [
        { value: "Sản phẩm cho mèo", label: "Sản phẩm cho mèo" },
        { value: "Hạt cho mèo", label: "Hạt cho mèo" },
        { value: "Súp thưởng cho mèo", label: "Súp thưởng cho mèo" },
        { value: "Tã lót cho mèo", label: "Tã lót cho mèo" },
        { value: "Khay vệ sinh cho mèo", label: "Khay vệ sinh cho mèo" },
        { value: "Xịt khử mùi cho mèo", label: "Xịt khử mùi cho mèo" },
        { value: "Pate cho mèo", label: "Pate cho mèo" },
        { value: "Cát vệ sinh cho mèo", label: "Cát vệ sinh cho mèo" },
        { value: "Balo cho mèo", label: "Balo cho mèo" },
        { value: "Túi đeo cho mèo", label: "Túi đeo cho mèo" },
        { value: "Gel dinh dưỡng cho mèo", label: "Gel dinh dưỡng cho mèo" },
        { value: "Vòng cổ trị rận cho mèo", label: "Vòng cổ trị rận cho mèo" },
        { value: "Vitamin cho mèo", label: "Vitamin cho mèo" },
        { value: "Chuồng cho mèo", label: "Chuồng cho mèo" },
    ];
    const categoriesForDog = [
        { value: "Sản phẩm cho chó", label: "Sản phẩm cho chó" },
        { value: "Hạt cho chó", label: "Hạt cho chó" },
        { value: "Súp thưởng cho chó", label: "Súp thưởng cho chó" },
        { value: "Tã lót cho chó", label: "Tã lót cho chó" },
        { value: "Khay vệ sinh cho chó", label: "Khay vệ sinh cho chó" },
        { value: "Xịt khử mùi cho chó", label: "Xịt khử mùi cho chó" },
        { value: "Pate cho chó", label: "Pate cho chó" },
        { value: "Cát vệ sinh cho chó", label: "Cát vệ sinh cho chó" },
        { value: "Balo cho chó", label: "Balo cho chó" },
        { value: "Túi đeo cho chó", label: "Túi đeo cho chó" },
        { value: "Gel dinh dưỡng cho chó", label: "Gel dinh dưỡng cho chó" },
        { value: "Vòng cổ trị rận cho chó", label: "Vòng cổ trị rận cho chó" },
        { value: "Vitamin cho chó", label: "Vitamin cho chó" },
        { value: "Chuồng cho chó", label: "Chuồng cho chó" },
    ];
    const mayhutbui = [{ value: "Máy hút bụi", label: "Máy hút bụi" }];
    const robothutbui = [{ value: "Robot hút bụi", label: "Robot hút bụi" }];

    const handleParseUrl = async () => {
        // const ShopeeAPI = (await import("../../../api/crawler")).default;
        const { CrawlerAPI_TIKI } = await import("../../../api/crawler");
        let response = await (await CrawlerAPI_TIKI.getProductByLinkAffilate(url)).data.product;
        console.log("RESPONSE", response);
        console.log("CATE", response.categories);
        let tempProduct: productInterface = {
            name: response.name,
            price: response.price,
            description: response.description,
            brand: response.brand.name,
            discount: response.discount,
            stock: response.stock_item.max_sale_qty,
            address: "",
            affilateLink: url,
            image: response.images[0].base_url,
            images: response.images.map((item: any) => item.base_url),
            affilateType: ["tiki"],
            hashtag: [],
            categories: [
                {
                    catid: response.categories.id,
                    display_name: response.categories.name,
                    no_sub: false,
                    is_default_subcat: false,
                },
            ],
        };

        setProduct(tempProduct);
        // let response = await ShopeeAPI.getProductByURL(url);
        // setProduct(response.data.products.data);
    };
    useEffect(() => {
        if (product && active == 0) {
            nextStep();
        }
    }, [product]);

    const onCreateProductTiki = async () => {
        const { CrawlerAPI_TIKI } = await import("../../../api/crawler");
        if (product) {
            let response = await CrawlerAPI_TIKI.createProductByLinkAffilate(product);
            if (response) {
                SweetAlert2.createSuccess(() => {
                    // Router.push("/shopee/create");
                    window.location.href = "/tiki/create";
                });
            }
        }

        // // const ShopeeAPI = (await import("../../../api/crawler")).default;
        // if (product) {
        //     let shopeeProduct = {
        //         itemid: product.itemid,
        //         title: product.name,
        //         description: product.description,
        //         shopid: product.shopid,
        //         shop_location: product.shop_location,
        //         image: product.image,
        //         images: product.images,
        //         stock: product.stock,
        //         price: product.price,
        //         categories: product.categories,
        //         brand: product.brand,
        //         discount: product.discount,
        //         attributes: product.attributes,
        //         affilate: url,
        //         tag: tag,
        //     };
        //     let response = await ShopeeAPI.createProductByShopee(shopeeProduct);
        //     if (response) {
        //         SweetAlert2.createSuccess(() => {
        //             // Router.push("/shopee/create");
        //             window.location.href = "/shopee/create";
        //         });
        //     }
        // }
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
                            <Grid.Col xl={4} style={{ border: "1px solid #ccc" }}>
                                <MultiSelect
                                    data={categoriesForDog}
                                    label="Chọn chuyên mục cho chó"
                                    placeholder="Chọn chuyên mục"
                                    onChange={(value) => {
                                        let tempArrDog: any = [];
                                        value.map((instance) => {
                                            let newCategories = {
                                                catid: uuidv4(),
                                                display_name: instance,
                                                no_sub: false,
                                                is_default_subcat: false,
                                            };
                                            tempArrDog.push(newCategories);
                                        });
                                        setDog(tempArrDog);
                                    }}
                                />
                            </Grid.Col>
                            <Grid.Col xl={4} style={{ border: "1px solid #ccc" }}>
                                <MultiSelect
                                    onChange={(value) => {
                                        let tempArrCat: any = [];
                                        value.map((instance) => {
                                            let newCategories = {
                                                catid: uuidv4(),
                                                display_name: instance,
                                                no_sub: false,
                                                is_default_subcat: false,
                                            };
                                            tempArrCat.push(newCategories);
                                        });
                                        setCat(tempArrCat);
                                    }}
                                    data={categoriesForCat}
                                    label="Chọn chuyên mục cho mèo"
                                    placeholder="Chọn chuyên mục"
                                />
                            </Grid.Col>

                            <Grid.Col xl={4} style={{ border: "1px solid #ccc" }}>
                                <MultiSelect
                                    onChange={(value) => {
                                        let tempArrCat: any = [];
                                        value.map((instance) => {
                                            let newCategories = {
                                                catid: uuidv4(),
                                                display_name: instance,
                                                no_sub: false,
                                                is_default_subcat: false,
                                            };
                                            tempArrCat.push(newCategories);
                                        });
                                        setMayHutBui(tempArrCat);
                                    }}
                                    data={mayhutbui}
                                    label="Chọn chuyên mục cho máy hút bụi"
                                    placeholder="Chọn chuyên mục"
                                />
                            </Grid.Col>

                            <Grid.Col xl={4} style={{ border: "1px solid #ccc" }}>
                                <MultiSelect
                                    onChange={(value) => {
                                        let tempArrCat: any = [];
                                        value.map((instance) => {
                                            let newCategories = {
                                                catid: uuidv4(),
                                                display_name: instance,
                                                no_sub: false,
                                                is_default_subcat: false,
                                            };
                                            tempArrCat.push(newCategories);
                                        });
                                        setRobotHutBui(tempArrCat);
                                    }}
                                    data={robothutbui}
                                    label="Chọn chuyên mục cho robot hút bụi"
                                    placeholder="Chọn chuyên mục"
                                />
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
                                setCategories([newCategories]);
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
                            // value={product ? product.brand.name : ""}
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
                            // value={product ? product.shop_location : ""}
                            required
                        />
                        <br />
                        <Textarea
                            placeholder="Tag"
                            label="Nhập tag "
                            onChange={(event) => {
                                // setTag(arrTag);
                                let arrTag: string[] = event.target.value.trim().split(" ");
                                if (product) {
                                    product.hashtag = arrTag;
                                    console.log("PRODUCT HASHTAG", product.hashtag);
                                }
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
                            size={"sm"}
                            fullWidth
                            onClick={async () => {
                                // product?.categories! = [...product?.categories!];

                                if (product) {
                                    //       product.categories = [
                                    //     ...product.categories,
                                    //     ...categories,
                                    //     ...dog,
                                    //     ...cat,
                                    //     ...mayHutBui,
                                    //     ...robotHutBui,
                                    // ];
                                    product.categories = [
                                        ...product.categories,
                                        ...categories,
                                        ...dog,
                                        ...cat,
                                        ...mayHutBui,
                                        ...robotHutBui,
                                    ];
                                }

                                // product?.categories =[
                                //     ...categories
                                // ]
                                onCreateProductTiki();
                            }}
                        >
                            Tạo sản phẩm từ TIKI
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
                    {/* <Button onClick={nextStep}>Tiếp tục</Button> */}
                </Group>
            </Container>
        </Wrapper>
    );
};

export default ShopeeCreate;
