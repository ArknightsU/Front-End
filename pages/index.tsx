import React from "react";
import {
    ResponsiveGrid,
    Operator,
    Gacha,
    Calculation,
    Music,
    Login,
    Settings,
    Ads,
    Dev,
    Theme,
    Logo,
    GridItem,
} from "@components";
import { Container } from "@components/Container";
import { useWindowSize } from "react-use";

const Home: React.FC = () => {
    return (
        <Container>
            <ResponsiveGrid>
                <GridItem key={"operator"}>
                    <Operator />
                </GridItem>
                <GridItem key={"gacha"}>
                    <Gacha />
                </GridItem>
                <GridItem key={"calc"}>
                    <Calculation />
                </GridItem>
                <GridItem key={"music"}>
                    <Music />
                </GridItem>
                <GridItem key={"login"}>
                    <Login />
                </GridItem>
                <GridItem key={"settings"}>
                    <Settings />
                </GridItem>
                <GridItem key={"ads"}>
                    <Ads />
                </GridItem>
                <GridItem key={"dev"}>
                    <Dev />
                </GridItem>
                <GridItem key={"theme"}>
                    <Theme />
                </GridItem>
                <GridItem key={"logo"}>
                    <Logo />
                </GridItem>
            </ResponsiveGrid>
        </Container>
    );
};

export default Home;
