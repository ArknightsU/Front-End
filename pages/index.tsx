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
import { useWindowSize } from "@components/main_page_component/useWindowSize";

import { useRecoilState } from "recoil";
import { DBSupport } from "@recoil/atoms";
import { useAsync } from "react-use";
import { useInitCharTableSetUp } from "@components/hooks/useInitCharTableSetUp";
import { useCharTable } from "@components/hooks/useCharTable";
import { useCharTableLocalStorage } from "@components/hooks/useCharTableLocalStorage";

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
    useInitCharTableSetUp();
    const amiya = useCharTableLocalStorage("char_002_amiya");
    console.log(amiya);
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
                </ResponsiveGrid>
            </Container>
            <GoogleLoginPopUp />
        </>
    );
};

export default Home;
