import React, { useEffect } from "react";
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
import { useWindowSize } from "@components/hooks/useWindowSize";
import { useRecoilState } from "recoil";
import { DBSupport } from "@recoil/atoms";
import { useInitCharTableSetUp } from "@components/hooks/useInitCharTableSetUp";
import { useCharTableLocalStorage } from "@components/hooks/useCharTableLocalStorage";
import { DBInitOver } from "@recoil/atoms";

const Home: React.FC = () => {
    const size = useWindowSize();
    const height = size.height;
    const width = size.width;
    const [dbStat, setDbStat] = useRecoilState(DBSupport);
    const InsertAdjustUI =
        width > 1024 ? (
            <GridItem key={"ui"}>
                <AdjustUI />
            </GridItem>
        ) : (
            ""
        );
    const [dbLoading, setDbLoading] = useRecoilState(DBInitOver);
    const loading = useInitCharTableSetUp();
    console.log("DBLoading", loading);
    useEffect(() => {
        if (loading) {
            setDbLoading(true);
            console.log("DB Init Over", dbLoading);
        }
    });
    return (
        <>
            <Container padding={true}>
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
                </ResponsiveGrid>
            </Container>
            <GoogleLoginPopUp />
        </>
    );
};

export default Home;
