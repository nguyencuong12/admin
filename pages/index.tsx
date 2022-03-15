import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Pagination, Table, Button, Modal } from "@mantine/core";
import Link from "next/link";
import { ProductAPI } from "../api";
const HomePageWrapper = styled.div``;

const AddButton = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
  width: 30%;
  margin: 0 auto;
  padding: 40px 0px;
`;

const GroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0px 10px;
`;
const PaginationWrapper = styled.div`
  padding: 20px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TableData = styled(Table)``;

const HomePage = () => {
  interface ProductProps {
    image: string;
    _id: string;
  }
  const [products, setProducts] = useState<ProductProps[] | []>([]);

  const rows = products.map((element, index) => (
    <tr key={element._id}>
      <td>
        <img style={{ height: "100px" }} alt="CUONG" src={`data:image/jpeg;base64,${products[index]?.image}`}></img>
      </td>
      <td>
        <img style={{ height: "100px" }} alt="CUONG" src={`data:image/jpeg;base64,${products[index]?.image}`}></img>
      </td>
      <td>
        <img style={{ height: "100px" }} alt="CUONG" src={`data:image/jpeg;base64,${products[index]?.image}`}></img>
      </td>
      <td>
        <img style={{ height: "100px" }} alt="CUONG" src={`data:image/jpeg;base64,${products[index]?.image}`}></img>
      </td>
      <td>
        <GroupButton>
          <Link href="/product/edit">
            <Button size={"xs"} color={"indigo"}>
              Edit
            </Button>
          </Link>

          <Button size={"xs"} color={"red"}>
            Delete
          </Button>
        </GroupButton>
      </td>
    </tr>
  ));
  const [activePage, setPage] = useState(2);
  useEffect(() => {
    test();
  }, []);
  useEffect(() => {}, [products]);
  const test = async () => {
    let response = await ProductAPI.getAllProduct();

    console.log("response", response);
    setProducts(response.data.products);
    console.log("Products", products);
  };
  return (
    <HomePageWrapper>
      <AddButton>
        <Link href="/product/create">
          <Button size={"xs"} color={"teal"} fullWidth={true} component={"a"} href="/product/create">
            Add
          </Button>
        </Link>
      </AddButton>

      <TableData verticalSpacing="xs" striped highlightOnHover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </TableData>
      <PaginationWrapper>
        <Pagination
          total={130 / 10}
          color="cyan"
          page={activePage}
          onChange={(page: number) => {
            console.log("aassasa", page);
          }}
        />
      </PaginationWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
