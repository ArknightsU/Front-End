import React, { useEffect, useState } from "react";
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
    forceInitDB,
    Translate,
    WeeklyNotify,
} from "@components";
import { Container } from "@components/Container";
import { useWindowSize } from "@components/hooks/useWindowSize";
import { useRecoilState } from "recoil";
import { initDB, setItem } from "@components/common/LocalForge/functions";
import { DBInitOver } from "@recoil/atoms/DBInitOver/index";
import { DungeonNotify } from "@components/main_page_component/Menus/DungeonNotify";
import { DBStatus } from "@components/main_page_component/Menus/DBStatus";
import Head from "next/head";
import axios from "axios";

const Home: React.FC = () => {
    /// test ///

    const [data, setData] = useState("");
    useEffect(() => {
        axios
            .get(
                "https://res01.hycdn.cn/7bc45071e2327fa519b08ce1ab41fcd3/618046F6/siren/audio/20210625/823892d4ca4fabb8e433ec9d48fde77f.mp3",
                { responseType: "blob" },
            )
            .then((response) => {
                return new Blob([response.data], {
                    type: response.headers["content-type"],
                });
            })
            .then((d) => {
                console.log(d);
                console.log(URL.createObjectURL(d));
                setData(URL.createObjectURL(d));
            });
    }, []);
    /// test ///
    const size = useWindowSize();
    const height = size.height;
    const width = size.width;
    const [isDBinitOver, setDBinitOver] = useRecoilState(DBInitOver);
    const [toggleInitDb, setToggleInitDb] = useState(false);
    useEffect(() => {
        setDBinitOver(false);
        if (!isDBinitOver) {
            initDB().then(() => {
                setDBinitOver(true);
            });
        }
    }, []);
    useEffect(() => {
        setDBinitOver(false);
        forceInitDB().then(() => {
            setDBinitOver(true);
        });
    }, [toggleInitDb]);
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
                        <Music data={data} />
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
                        <DBStatus
                            loading={!isDBinitOver}
                            toggleInitDb={() => {
                                setToggleInitDb(!toggleInitDb);
                            }}
                        />
                    </GridItem>
                    <GridItem key={"trans"}>
                        <Translate />
                    </GridItem>
                </ResponsiveGrid>
            </Container>
            <GoogleLoginPopUp />
        </>
    );
};

export default Home;
