import React, { useState } from "react";
import styled from "styled-components";
import { ActionIcon, Burger } from "@mantine/core";
import { AiOutlineSearch } from "react-icons/ai";

const NavbarWrapper = styled.div`
  margin-left: ${(props) => props.theme.sidebarWidth};
  padding: 0px 10px;
  height: 60px;
  overflow: hidden;
  position: relative;
  background: ${(props) => props.theme.backgroundColor};
  color: rgb(110, 117, 159);
  box-shadow: ${(props) => props.theme.boxShadow};
  @media only screen and (max-width: ${(props) => props.theme.breakSM}) {
    margin-left: 0px;
  }
`;
const NavbarBurger = styled(Burger)`
  display: none;
  @media only screen and (max-width: ${(props) => props.theme.breakSM}) {
    display: block;
  }
`;

const NavbarContent = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
`;
const NavbarLogo = styled.h2`
  font-size: 20px;
`;

const NavbarControl = styled.div`
  display: flex;
  align-items: center;
`;
const NavbarMenuItem = styled.div``;

const NavbarComponent = () => {
  const [opened, setOpened] = useState(false);

  const clickBurger = () => {
    setOpened(!opened);
  };
  return (
    <NavbarWrapper>
      <NavbarContent>
        <NavbarBurger opened={opened} onClick={() => clickBurger()} />
        {/* BURGER */}
        <NavbarLogo>Logo</NavbarLogo>
        <NavbarControl>
          <ActionIcon variant="transparent" size="md">
            <AiOutlineSearch size={40}></AiOutlineSearch>
          </ActionIcon>
        </NavbarControl>
      </NavbarContent>
    </NavbarWrapper>
  );
};

export default NavbarComponent;
