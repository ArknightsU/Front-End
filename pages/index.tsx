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
    Status,
    GridItem,
    AdjustUI,
    GoogleLoginPopUp,
} from "@components";
import { Container } from "@components/Container";
import { useWindowSize } from "@components/hooks/useWindowSize";
import { useRecoilState } from "recoil";
import { DBSupport } from "@recoil/atoms";
import { initDB, setItem } from "@components/common/LocalForge/functions";
import { DBInitOver } from "@recoil/atoms/DBInitOver/index";
import { DungeonNotify } from "@components/main_page_component/Menus/DungeonNotify";
import { WeeklyNotify } from "@components/main_page_component/Menus/WeeklyNotify";
import { DBStatus } from "@components/main_page_component/Menus/DBStatus";
import Head from "next/head";

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
    const [isDBinitOver, setDBinitOver] = useRecoilState(DBInitOver);
    useEffect(() => {
        if (!isDBinitOver) {
            initDB().then(() => {
                setDBinitOver(true);
            });
        }
    }, []);
    return (
        <>
            <Head>
                <title>{"ARKNIGHTS ONE"}</title>
            </Head>
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
                    <GridItem key={"status"}>
                        <Status />
                    </GridItem>
                    <GridItem key={"dungeon"}>
                        <DungeonNotify />
                    </GridItem>
                    <GridItem key={"weekly"}>
                        <WeeklyNotify />
                    </GridItem>
                    <GridItem key={"db"}>
                        <DBStatus />
                    </GridItem>
                </ResponsiveGrid>
            </Container>
            <GoogleLoginPopUp />
        </>
    );
};

export default Home;
