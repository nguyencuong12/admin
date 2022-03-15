import React, { ReactNode } from "react";
import styled from "styled-components";
import { MantineProvider, createStyles } from "@mantine/core";

interface BodyProps {
  children: ReactNode;
}
const BodyWrapper = styled.div`
  padding: 20px 0px;
  overflow: hidden;
  height: 93.8vh;
  overflow-y: auto;
  margin-left: ${(props) => props.theme.sidebarWidth};
  @media only screen and (max-width: ${(props) => props.theme.breakSM}) {
    margin-left: 0px;
  }
`;
const BodyContent = styled.div`
  width: 95%;
  margin: 0 auto;
`;

const BodyComponent = (props: BodyProps) => {
  const { children } = props;

  return (
    <BodyWrapper>
      <BodyContent>{children}</BodyContent>
    </BodyWrapper>
  );
};

export default BodyComponent;
