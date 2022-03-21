import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import { ActionIcon, Pagination, Table, Button, Modal, LoadingOverlay, DEFAULT_THEME, Group, Input } from "@mantine/core";
import Link from "next/link";
import { ProductAPI, SearchAPI } from "../api";
import { DeleteModal } from "../components";
import alertMessage from "../components/toast";
import { sweetAlertInf } from "../interface";

// import { DialogDelete } from "../components";
const HomePageWrapper = styled.div``;

const AddButton = styled.div`
  width: 20%;
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
  // ********* HOOK ***********
  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [selectProduct, setSelectProduct] = useState<string>();
  const [searchField, setSearchField] = useState("");

  // ********* HOOK ***********
  useEffect(() => {
    fetchAllProduct();
  }, []);

  const rows = products.map((element) => (
    <tr key={element._id}>
      <td>
        <h4> {element.title}</h4>
      </td>
      <td>
        <img style={{ width: "100px", height: "80px", objectFit: "cover" }} alt="CUONG" src={`data:image/jpeg;base64,${element?.image}`}></img>
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

          <Button
            size={"xs"}
            color={"red"}
            onClick={() => {
              setSelectProduct(element._id);
              setDialogDelete(true);
            }}
          >
            Delete
          </Button>
        </GroupButton>
      </td>
    </tr>
  ));

  const fetchAllProduct = async () => {
    setLoading(true);
    let response = await ProductAPI.getAllProduct(activePage);
    console.log("RESPONSE", response);
    if (response.status === 200) {
      setLoading(false);
      setProducts(response.data.products.product);
      setTotalPage(response.data.products.count);
    }
  };
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
        fetchAllProduct();
        setSelectProduct("");
        await alertMessage(objectAlert);
      }
    }
    setDialogDelete(false);
  };
  const submitSearch = async () => {
    setLoading(true);
    let response = await SearchAPI.search(searchField);
    if (response) {
      setLoading(false);
      setProducts(response.data.searchResults);
    }
    // setLoading(true);
  };
  return (
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
          <Link href="/product/create">
            <Button size={"sm"} color={"teal"} fullWidth={true} component={"a"} href="/product/create">
              Add
            </Button>
          </Link>
        </AddButton>
      </Group>
      <div style={{ width: "100%", position: "relative", marginTop: "40px" }}>
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
          // Math.ceil(total_items/limit);
          total={Math.ceil(totalPage / 4)}
          color="cyan"
          page={activePage}
          onChange={async (page: number) => {
            setPage(page);
            setLoading(true);
            let response = await ProductAPI.getAllProduct(page);
            if (response.status === 200) {
              setLoading(false);
              setProducts(response.data.products.product);
              setTotalPage(response.data.products.count);
            }
          }}
        />
      </PaginationWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
