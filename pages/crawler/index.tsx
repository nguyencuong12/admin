import React from "react";
import { Group, Input, Button, Container } from "@mantine/core";
import styled from "styled-components";
import { Search } from "tabler-icons-react";
const Wrapper = styled.div``;

const CrawlerComponent = () => {
    const handleParseUrl = async () => {
        // const Fuse = (await import("react")).default;

        const ShopeeAPI = (await import("../../api/crawler")).default;
        let response = await ShopeeAPI.getProductByID("17642587434", "736867547");
        console.log("RESPONSE (1)", response);
        // CrawlerAPI_SHOPEE
    };
    return (
        <Wrapper>
            <Container>
                <Group position="center">
                    <Input icon={<Search />} placeholder="Url parse" style={{ flexGrow: "1" }} />
                    <Button style={{ width: "100px" }} onClick={() => handleParseUrl()}>
                        Parse
                    </Button>
                </Group>
            </Container>
        </Wrapper>
    );
};

export default CrawlerComponent;
