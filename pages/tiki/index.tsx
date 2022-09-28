import { Grid } from "@mantine/core";
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
const Wrapper = styled.div`
    border-radius: 5px;
    width: 80%;
    margin: 0 auto;
    padding-top: 30px;
    h1 {
        text-align: center;
        color: orange;
        font-size: 34px;
    }
`;
const ShopeeProducts = styled.div`
    /* min-width: 400px; */
    height: 250px;
    border: 1px solid #ccc;
    background: url("/verified.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    border-radius: 5px;
    cursor: pointer;
    :hover {
        opacity: 0.7;
    }
`;
const ShopeeCreateProduct = styled.div`
    height: 250px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background: url("/create.png");

    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    cursor: pointer;
    :hover {
        opacity: 0.7;
    }
`;

const ShopeeAffilate = () => {
    const router = useRouter();
    const onHandleNavigatePage = (href: string) => {
        router.push(href);
    };
    return (
        <Wrapper>
            <h1>Tiki Affilate</h1>
            <Grid>
                <Grid.Col md={6}>
                    <ShopeeCreateProduct
                        onClick={() => onHandleNavigatePage("/tiki/create")}
                    ></ShopeeCreateProduct>
                </Grid.Col>
                <Grid.Col md={6}>
                    <ShopeeProducts
                        onClick={() => onHandleNavigatePage("/tiki/list")}
                    ></ShopeeProducts>
                </Grid.Col>
            </Grid>
        </Wrapper>
    );
};

export default ShopeeAffilate;
