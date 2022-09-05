import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { ActionIcon, Pagination, Button, Group, Input } from "@mantine/core";
import Link from "next/link";
import { ProductAPI, SearchAPI } from "../api";
import { DeleteModal } from "../components";
import alertMessage from "../components/toast";
import { sweetAlertInf } from "../interface";
import { ProductUpdateInf } from "../interface";
// import { DialogDelete } from "../components";
import { useRouter } from "next/router";
import { Table } from "react-super-responsive-table";
import TableComponent from "../components/table";
import Head from "next/head";

const HomePageWrapper = styled.div``;

const AddButton = styled.div`
    width: 25%;
`;

const GroupButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0px 10px;
`;
const PaginationWrapper = styled.div`
    padding: 20px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TableData = styled(Table)``;

// width: "100%", position: "relative", marginTop: "40px"
const TableWrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    position: relative;
    margin-top: 40px;
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`;

const HomePage = () => {
    // interface ProductProps {
    //   title: string;
    //   price: string;
    //   hashtag: Array<string>;
    //   description: string;
    //   image: string;
    //   _id: string;
    // }
    // ********* HOOK ***********

    const [products, setProducts] = useState<ProductUpdateInf[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [dialogDelete, setDialogDelete] = useState(false);
    const [selectProduct, setSelectProduct] = useState<string>();
    const [searchField, setSearchField] = useState("");
    const [activePage, setPage] = useState<number>(1);
    const router = useRouter();
    // ********* HOOK ***********

    useEffect(() => {
        const getProductInResponse = async () => {
            let response = await ProductAPI.getAllProduct(activePage);
            console.log("response ", response);
            return response.data.products._productList;
        };
        const fetchAllProduct = async () => {
            excuteAction();
            let products = await getProductInResponse();

            let totalAmountProducts = await getPageTotal();
            await Promise.all([products, totalAmountProducts]).then(() => {
                saveProductInState(products);
                setTotalPage(totalAmountProducts);
                setLoading(false);
            });
        };
        if (!localStorage.getItem("access_token")) {
            router.push("/login");
        } else {
            fetchAllProduct();
        }
    }, [activePage, router]);

    const excuteAction = () => {
        setLoading(true);
    };

    const saveProductInState = async (products: [ProductUpdateInf]) => {
        console.log("products", products);
        setProducts(products);
        setLoading(false);
    };
    async function getPageTotal() {
        let response = await ProductAPI.getTotalAmountProduct();
        return response.data.total;
    }

    const onDeleteCallback = async (deleteStatus: boolean) => {
        if (deleteStatus) {
            console.log("select", selectProduct);
            let response = await ProductAPI.deleteProduct(selectProduct);
            if (response) {
                let objectAlert: sweetAlertInf = {
                    title: "Status",
                    content: "Delete Success",
                    icon: "success",
                };

                setSelectProduct("");
                await alertMessage(objectAlert);
                router.push("/shopee/products");
            }
        }
        setDialogDelete(false);
    };
    const submitSearch = async () => {
        excuteAction();
        let response = await SearchAPI.search(searchField);
        saveProductInState(response.data.searchResults);
    };
    return (
        <>
            <Head>
                <title>Anh kiet Admin</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
                />
                <meta name="googlebot" content="noindex" />
                <meta name="robots" content="noindex" />
            </Head>
            <HomePageWrapper>
                <DeleteModal show={dialogDelete} deleteFunc={onDeleteCallback}></DeleteModal>
                <Group
                    position="apart"
                    style={{ paddingBottom: "20px" }}
                    onKeyUp={(e) => {
                        if (e.keyCode === 13) {
                            submitSearch();
                        }
                    }}
                >
                    <Input
                        size="sm"
                        placeholder="Search Product"
                        onChange={(e: any) => {
                            setSearchField(e.target.value);
                        }}
                        rightSection={
                            <ActionIcon variant="transparent" onClick={submitSearch}>
                                <FaSearch size={20}></FaSearch>
                            </ActionIcon>
                        }
                    />

                    <AddButton>
                        <Link href="/product/create" passHref={true}>
                            <Button
                                size={"sm"}
                                color={"teal"}
                                fullWidth={true}
                                component={"a"}
                                href="/product/create"
                            >
                                Add
                            </Button>
                        </Link>
                    </AddButton>
                </Group>
                <TableComponent products={products}></TableComponent>
                <PaginationWrapper>
                    <Pagination
                        total={Math.ceil(totalPage / 4)}
                        color="cyan"
                        page={activePage}
                        onChange={async (page: number) => {
                            setPage(page);
                            excuteAction();
                            let response = await ProductAPI.getAllProduct(page);
                            setLoading(false);
                            setProducts(response.data.products._productList);
                            setTotalPage(response.data.products.count);
                            // setProductAndSaveInState();
                        }}
                    />
                </PaginationWrapper>
            </HomePageWrapper>
        </>
    );
};

export default HomePage;
