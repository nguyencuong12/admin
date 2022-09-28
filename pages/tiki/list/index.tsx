import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";
import { Group, Button, TextInput, Pagination } from "@mantine/core";
import { FaTrash, FaPen } from "react-icons/fa";
import Link from "next/link";
import SweetAlert2 from "../../../utils/sweetAlert";
import { useRouter } from "next/router";
import { formatPrice } from "../../../utils/formatPrice/formatPrice";
import CrawlerAPI_SHOPEE from "../../../api/crawler";
import { ShopeeInf } from "../../../interface";
const SearchWrapper = styled.div`
    max-width: 300px;
    margin: 10px 0px;
`;
const ButtonUpdate = styled.a``;

const TableWrapper = styled.table`
    width: 100%;
    border-collapse: collapse;
    td,
    th {
        padding: 10px 15px;
        text-align: center;
    }
    td {
        border-bottom: 1px solid black;
        :last-child {
            border-bottom: 0px;
        }
    }
    tr {
        border: 1px solid black;
    }
    /* td {
    border: 1px solid black;
  } */
    th {
        background: #423e3b;
        color: #fff;
    }
    tbody tr:nth-child(even) {
        background: #f5f5f5;
    }
    @media screen and (max-width: 600px) {
        thead {
            display: none;
        }
        table,
        tbody,
        td,
        tr {
            display: block;
            width: 100%;
        }
        tr {
            margin-bottom: 15px;
        }
        td {
            text-align: right;
            position: relative;
            padding-left: 50%;
        }
        td::before {
            content: attr(data-label);
            position: absolute;
            left: 0;
            top: 8px;
            text-align: left;
            padding-left: 15px;
            font-size: 16px;
            font-weight: bold;
        }
        /* STYLES HERE */
    }
`;

const ListTikiDocument = () => {
    const [products, setProducts] = useState<any[]>();
    const [search, setSearch] = useState("");
    const [total, setTotal] = useState(0);

    const fetchAllProduct = async (page: number) => {
        let response = await CrawlerAPI_SHOPEE.fetchAllProductInShopee(page);
        setProducts(response.data.products);
        setTotal(response.data.total);
    };
    useEffect(() => {
        Promise.all([fetchAllProduct(1)]);
    }, []);
    const onHandleDeleteItem = (id: string) => {
        SweetAlert2.deleteConfirm(id, async () => {
            await fetchAllProduct(1);
        });
    };

    const renderRow = (products: ShopeeInf[]) => {
        return products.map((instance) => {
            return (
                <tr key={instance.itemid}>
                    <td data-label="Sản Phẩm">{instance.title}</td>
                    <td data-label="Hình Ảnh">
                        <Image
                            alt="image-description"
                            src={`https://cf.shopee.vn/file/${instance.image}`}
                            height={40}
                            width={60}
                            objectFit={"contain"}
                            layout="responsive"
                        ></Image>
                    </td>
                    <td data-label="Giá Tiền">
                        {formatPrice(instance.price)}
                        {/* {instance.price} */}
                    </td>
                    <td data-label="Thao Tác">
                        <Group position="right" noWrap>
                            <Link href={`product/${instance.itemid}`}>
                                <a style={{ padding: "5px 10px", border: "1px solid red" }}>
                                    Chỉnh sửa
                                </a>

                                {/* <Button size={"xs"} variant="outline" leftIcon={<FaPen></FaPen>}>
                                    Chỉnh Sửa
                                </Button> */}
                            </Link>
                            <Button
                                size={"xs"}
                                variant="outline"
                                color={"red"}
                                leftIcon={<FaTrash></FaTrash>}
                                onClick={() => {
                                    onHandleDeleteItem(instance.itemid!);
                                }}
                            >
                                Xóa
                            </Button>
                        </Group>
                    </td>
                </tr>
            );
        });
    };
    return (
        <>
            <SearchWrapper>
                <TextInput
                    placeholder="Search"
                    onKeyDown={async (event) => {
                        if (event.keyCode === 13) {
                            let response = await CrawlerAPI_SHOPEE.searchProductInShopee(search);
                            setProducts(response.data.products);
                        }
                    }}
                    onChange={(event) => {
                        setSearch(event.target.value);
                    }}
                />
            </SearchWrapper>

            <TableWrapper>
                {/* {products.map((instance) => {
      return <h1>{instance.title}</h1>;
    })} */}
                <thead>
                    <tr>
                        <th>Sản Phẩm</th>
                        <th>Hình Ảnh</th>
                        <th>Giá Tiền</th>
                        <th>Thao Tác</th>
                    </tr>
                </thead>
                <tbody>{products && renderRow(products)}</tbody>
            </TableWrapper>
            <Group position="right" spacing="xs" style={{ padding: "10px 0" }}>
                <Pagination
                    total={Math.ceil(total / 4)}
                    onChange={async (page: number) => {
                        await fetchAllProduct(page);
                    }}
                />
            </Group>
        </>
    );
};

export default ListTikiDocument;
