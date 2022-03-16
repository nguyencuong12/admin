import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Pagination, Table, Button, Modal, LoadingOverlay, DEFAULT_THEME } from "@mantine/core";
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
    title: string;
    price: string;
    hashtag: Array<string>;
    description: string;
    image: string;
    _id: string;
  }
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const rows = products.map((element) => (
    <tr key={element._id}>
      <td>
        <h4> {element.title}</h4>
      </td>
      <td>
        <img style={{ height: "100px" }} alt="CUONG" src={`data:image/jpeg;base64,${element?.image}`}></img>
      </td>
      <td>
        <span>{element.description}</span>
      </td>
      <td>
        <span>{element.price}</span>
      </td>
      <td>
        <GroupButton>
          <Link href={`/product/${element._id}`}>
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

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const fetchAllProduct = async () => {
    setLoading(true);
    let response = await ProductAPI.getAllProduct();
    if (response.status === 200) {
      setLoading(false);
      setProducts(response.data.products);
    }
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
      <div style={{ width: "100%", position: "relative" }}>
        <LoadingOverlay visible={loading} />
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
      </div>
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
