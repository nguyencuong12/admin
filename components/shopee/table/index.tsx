import React, { useState, useEffect } from "react";
import styled from "styled-components";

import Image from "next/image";
import { Group, Button } from "@mantine/core";
import { FaTrash, FaPen } from "react-icons/fa";
import Link from "next/link";
import SweetAlert2 from "../../../utils/sweetAlert";
import { useRouter } from "next/router";
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
interface propsType {
    products: any[];
}
const ShopeeTableComponent = (props: propsType) => {
    const { products } = props;
    const router = useRouter();

    const onHandleDeleteItem = (id: string) => {
        SweetAlert2.deleteConfirm(id, () => {
            router.push("/shopee/products");
        });
    };
    const renderRow = (products: any[]) => {
        return products.map((instance) => {
            return (
                <tr key={instance._id}>
                    <td data-label="Sản Phẩm">{instance.title}</td>
                    <td data-label="Hình Ảnh">
                        <img
                            style={{ height: "80px" }}
                            src={`https://cf.shopee.vn/file/${instance.image}`}
                        ></img>
                    </td>
                    <td data-label="Giá Tiền">{instance.price}</td>
                    <td data-label="Thao Tác">
                        <Group position="right" direction="row" noWrap>
                            <Link href={`product/${instance.itemid}`}>
                                <Button size={"xs"} variant="outline" leftIcon={<FaPen></FaPen>}>
                                    Chỉnh Sửa
                                </Button>
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
            <tbody>{renderRow(products)}</tbody>
        </TableWrapper>
    );
};

export default ShopeeTableComponent;
