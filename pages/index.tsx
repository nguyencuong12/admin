import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { ActionIcon, Pagination, Table, Button, Modal, LoadingOverlay, DEFAULT_THEME, Group, Input } from "@mantine/core";
import Link from "next/link";
import { ProductAPI, SearchAPI } from "../api";
import { DeleteModal } from "../components";
import alertMessage from "../components/toast";
import { sweetAlertInf } from "../interface";
import { ProductInf } from "../interface";
// import { DialogDelete } from "../components";
import { useRouter } from "next/router";
import Image from "next/image";
const HomePageWrapper = styled.div``;

const AddButton = styled.div`
  width: 25%;
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
  const router = useRouter();

  const [products, setProducts] = useState<ProductInf[] | []>([]);
  const [activePage, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [selectProduct, setSelectProduct] = useState<string>();
  const [searchField, setSearchField] = useState("");

  // ********* HOOK ***********
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      router.push("/login");
    } else {
      fetchAllProduct();
    }
  }, []);

  const rows = products.map((element) => (
    <tr key={element._id}>
      <td>
        <h4 style={{ maxWidth: "100px" }}> {element.title}</h4>
      </td>
      <td>
        {/* <img style={{ width: "100px", height: "80px", objectFit: "cover" }} alt="CUONG" src={element.image?.toString()}></img> */}

        <Image src={element.image!.toString()} height={60} width={60} objectFit="contain"></Image>
        {/* <img style={{ width: "100px", height: "80px", objectFit: "cover" }} alt="CUONG" src={`data:image/jpeg;base64,${element?.image}`}></img> */}
      </td>

      <td>
        <span>{element.price}</span>
      </td>
      <td>
        <GroupButton>
          <Link href={`/product/${element._id}`}>
            <Button size={"xs"} color={"info"}>
              Chỉnh Sửa
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
            Xóa
          </Button>
        </GroupButton>
      </td>
    </tr>
  ));
  const excuteAction = () => {
    setLoading(true);
  };
  const getProductInResponse = async () => {
    let response = await ProductAPI.getAllProduct(activePage);
    return response.data.products.product;
  };
  const saveProductInState = async (products: [ProductInf]) => {
    setProducts(products);
    setLoading(false);
  };
  async function getPageTotal() {
    let response = await ProductAPI.getTotalAmountProduct();
    return response.data.total;
  }
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
    excuteAction();
    let response = await SearchAPI.search(searchField);
    saveProductInState(response.data.searchResults);
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
      <TableWrapper>
        <LoadingOverlay visible={loading} />
        <TableData horizontalSpacing="xl" verticalSpacing="xs">
          <thead>
            <tr>
              <th>Sản Phẩm</th>
              <th>Hình Ảnh</th>
              <th>Giá Tiền</th>
              <th>Thao Tác</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </TableData>
      </TableWrapper>
      <PaginationWrapper>
        <Pagination
          // Math.ceil(total_items/limit);
          total={Math.ceil(totalPage / 4)}
          color="cyan"
          page={activePage}
          onChange={async (page: number) => {
            setPage(page);
            excuteAction();
            let response = await ProductAPI.getAllProduct(page);
            setLoading(false);
            setProducts(response.data.products.product);
            setTotalPage(response.data.products.count);
            // setProductAndSaveInState();
          }}
        />
      </PaginationWrapper>
    </HomePageWrapper>
  );
};

export default HomePage;
