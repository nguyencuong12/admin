import { useState, useEffect, useContext } from "react";
import { Drawer, Button, Divider } from "@mantine/core";
import styled, { ThemeContext } from "styled-components";
import { AiFillMessage } from "react-icons/ai";
import { useViewportSize } from "@mantine/hooks";
const DrawerWrapper = styled(Drawer)`
  width: ${(props) => props.theme.sidebarWidth};
  background: rgb(255, 255, 255);
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  color: rgb(110, 117, 159);
  .mantine-Drawer-title {
    font-size: 30px;
  }
`;

const DrawerMenu = styled.ul`
  margin: 0px;
  padding: 5px;
`;
const DrawerMenuItem = styled.p`
  color: rgb(77, 81, 111);
  font-weight: 600;
  font-size: 16px;
`;

const DrawerItem = styled.li`
  list-style: none;
  font-size: 14px;
  margin: 5px 0px;
`;
const Footer = styled.div`
  position: absolute;
  bottom: 0;
  /* border: 1px solid ${(props) => props.theme.backgroundColor}; */
  left: 0;
  right: 0;
  text-align: center;
  border-top: 1px solid #ccc;
  padding: 10px 20px;
`;
function SidebarComponent() {
  const { width } = useViewportSize();
  const themeContext = useContext(ThemeContext);
  const [opened, setOpened] = useState(true);
  useEffect(() => {
    // console.log("TYPE 1", typeof width.toString());
    if (width <= parseInt(themeContext.breakSM) && opened) {
      console.log("AAA");
      setOpened(!opened);
    }
    if (width >= parseInt(themeContext.breakSM) && !opened) {
      console.log("AAA");
      setOpened(!opened);
    }
  }, [width]);
  return (
    <>
      <DrawerWrapper trapFocus={false} withOverlay={true} opened={opened} withCloseButton={false} onClose={() => setOpened(false)} title="Drawer Title" padding="xl" size="xl">
        <DrawerMenu>
          <DrawerMenuItem>Dashboards</DrawerMenuItem>
          <DrawerItem>
            <Button variant="outline" fullWidth={true} leftIcon={<AiFillMessage></AiFillMessage>}>
              Messages
            </Button>
          </DrawerItem>
        </DrawerMenu>
        <Divider my="sm" variant="dashed" />

        <DrawerMenu>
          <DrawerMenuItem>Manager Product</DrawerMenuItem>
          <DrawerItem></DrawerItem>
          <DrawerItem>
            <Button variant="outline" fullWidth={true} leftIcon={<AiFillMessage></AiFillMessage>}>
              View Products
            </Button>
          </DrawerItem>
        </DrawerMenu>
        <Divider my="sm" variant="dashed" />
        <Footer>FOOTER</Footer>
      </DrawerWrapper>
    </>
  );
}

export default SidebarComponent;
