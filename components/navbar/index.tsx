import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ActionIcon, Burger } from '@mantine/core';
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '../../store/hook';
import { changeMenu, setCloseMenu } from '../../store/slices/menu';
import Link from 'next/link';
import SweetAlert2 from '../../utils/sweetAlert';
import { useRouter } from 'next/router';
interface propsMenu {
  open: boolean;
}
const NavbarWrapper = styled.div`
  /* margin-left: ${props => props.theme.sidebarWidth}; */
  padding: 0px 10px;
  height: 60px;
  /* overflow: hidden; */
  position: relative;
  background: ${props => props.theme.backgroundColor};
  color: rgb(110, 117, 159);
  box-shadow: ${props => props.theme.boxShadow};
  @media only screen and (max-width: ${props => props.theme.breakSM}) {
    margin-left: 0px;
  }
`;
const NavbarBurger = styled(Burger)`
  display: none;
  @media only screen and (max-width: ${props => props.theme.breakSM}) {
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
  cursor: pointer;
`;

const NavbarControl = styled.div`
  display: flex;
  align-items: center;
`;
const NavbarMenu = styled.ul<propsMenu>`
  flex: 1;
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0px;
  margin: 0px;
  transition: left 200ms ease-in-out;
  @media only screen and (max-width: 768px) {
    /* display: none; */
    position: absolute;
    height: 100vh;
    /* background: ${props => props.theme.swatches2}; */
    background: #424243;
    top: 60px;
    width: 100%;
    /* left: -120%; */
    left: ${props => (props.open ? '0' : '-120%')};
    z-index: 1000;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
    color: #fff;
  }
`;
const NavbarMenuItem = styled.li`
  margin: 10px 15px;
  :hover {
    color: red;
  }
  :first-child {
    margin-left: 50px;
  }
  @media only screen and (max-width: 768px) {
    margin: 0;
    padding: 0;
    /* padding: 10px; */
    margin: 5px 20px;
    width: 92%;
    :first-child {
      margin-top: 20px;
      margin-left: 20px;
    }

    border: 1px solid white;

    a {
      padding: 10px;
      display: block;
    }
  }
`;
const NavbarComponent = () => {
  const dispatch = useAppDispatch();
  const menuState = useAppSelector(state => state.menu.open);
  const router = useRouter();

  const clickBurger = () => {
    dispatch(changeMenu({}));
  };
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      dispatch(setCloseMenu());
    });
    return () => {
      router.events.off('routeChangeComplete', () => {
        console.log('stoped');
      });
    };
  }, [router.events, dispatch]);

  return (
    <NavbarWrapper>
      <NavbarContent>
        <NavbarBurger opened={menuState} onClick={() => clickBurger()} />
        {/* BURGER */}
        <Link href="/">
          <NavbarLogo>WEBSITE</NavbarLogo>
        </Link>
        <NavbarMenu open={menuState}>
          <NavbarMenuItem>
            <Link href="/">
              <a>Trang Chủ</a>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/order">
              <a>Quản lý đơn hàng</a>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/order/ordered">
              <a>Các đơn hàng đã đặt</a>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/order/denied">
              <a>Các đơn hàng đã hủy</a>
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Link href="/guest">
              <a>Danh sách khách hàng</a>
            </Link>
          </NavbarMenuItem>
        </NavbarMenu>
        <NavbarControl>
          <ActionIcon
            variant="transparent"
            size="md"
            onClick={() => {
              SweetAlert2.logout();
            }}
          >
            <AiOutlineLogout size={40}></AiOutlineLogout>
          </ActionIcon>
        </NavbarControl>
      </NavbarContent>
    </NavbarWrapper>
  );
};

export default NavbarComponent;
