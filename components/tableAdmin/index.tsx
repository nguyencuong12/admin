import React from "react";
import styled from "styled-components";
import { Badge } from "@mantine/core";

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

const TableAdmin = () => {
  return (
    <TableWrapper>
      <thead>
        <tr>
          <td>Sản Phẩm</td>
          <td>Hình Ảnh</td>
          <td>Số Lượng</td>
          <td>Giá</td>
          <td>Tên Người Dùng</td>
          <td>SDT</td>
          <td>Tổng Tiền</td>
          <td>Trạng Thái</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">123</td>
          <td data-label="CUONG">
            <Badge size={"md"} color={"green"}>
              Đã đặt hàng
            </Badge>
          </td>
        </tr>
      </tbody>
    </TableWrapper>
  );
};

export default TableAdmin;
