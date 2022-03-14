import React from "react";
import styled from "styled-components";
import { Table } from "@mantine/core";

const HomePageWrapper = styled.div``;
const elements = [
  {
    name: "cuong",
    position: "csa",
    symbol: "asd",
    mass: "asd",
  },
];
const rows = elements.map((element) => (
  <tr key={element.name}>
    <td>{element.position}</td>
    <td>{element.name}</td>
    <td>{element.symbol}</td>
    <td>{element.mass}</td>
  </tr>
));
const TableData = styled(Table)``;

const HomePage = () => {
  return (
    <HomePageWrapper>
      <TableData>
        <thead>
          <tr>
            <th>Element position</th>
            <th>Element name</th>
            <th>Symbol</th>
            <th>Atomic mass</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </TableData>
    </HomePageWrapper>
  );
};

export default HomePage;
