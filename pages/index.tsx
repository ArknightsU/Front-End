import React from "react";
import {
    ResponsiveGrid,
    Operator,
    Gacha,
    Calculation,
    Music,
    Login,
    Settings,
    Dev,
    Theme,
    Logo,
    GridItem,
    AdjustUI,
    GoogleLoginPopUp,
} from "@components";
import { Container } from "@components/Container";
import { useWindowSize } from "@components/useWindowSize";

const Home: React.FC = () => {
    const size = useWindowSize();
    const height = size.height;
    const width = size.width;
    const InsertAdjustUI =
        width > 1024 ? (
            <GridItem key={"ui"}>
                <AdjustUI />
            </GridItem>
        ) : (
            ""
        );
    return (
        <>
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
                    <GridItem key={"dev"}>
                        <Dev />
                    </GridItem>
                    <GridItem key={"theme"}>
                        <Theme />
                    </GridItem>
                    <GridItem key={"logo"}>
                        <Logo />
                    </GridItem>
                    {InsertAdjustUI}
                </ResponsiveGrid>
            </Container>
            <GoogleLoginPopUp />
        </>
    );
};

export default Home;
