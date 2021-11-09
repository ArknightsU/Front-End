import React, { useEffect, useRef, useState } from "react";
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
    GoogleLoginPopUp,
    forceInitDB,
    Translate,
    WeeklyNotify,
} from "@components";
import { Container } from "@components/Container";
import { useWindowSize } from "@components/hooks/useWindowSize";
import { useRecoilState } from "recoil";
import { initDB } from "@components/common/LocalForge/functions";
import { DBInitOver } from "@recoil/atoms/DBInitOver/index";
import { DungeonNotify } from "@components/main_page_component/Menus/DungeonNotify";
import { DBStatus } from "@components/main_page_component/Menus/DBStatus";
import Head from "next/head";
import { RecoilError } from "@recoil/atoms";
import { ApiError } from "@components/ApiSync";

const Home: React.FC = () => {
    const size = useWindowSize();
    const height = size.height;
    const width = size.width;
    const [dbLoading, setDBLoading] = useState(false);
    const [isDBinitOver, setDBinitOver] = useRecoilState(DBInitOver);
    const [toggleInitDb, setToggleInitDb] = useState(false);
    const [error, setError] = useRecoilState(RecoilError);
    const isFirstRender = useRef(false);
    useEffect(() => {
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }
        console.log("forced");
        setDBLoading(false);
        forceInitDB().then(() => {
            setDBLoading(true);
        });
    }, [toggleInitDb]);
    useEffect(() => {
        if (!isDBinitOver) {
            initDB().then(() => {
                setDBinitOver(true);
                setDBLoading(true);
            });
        } else {
            setDBLoading(true);
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
                    <GridItem key={"db"}>
                        <DBStatus
                            loading={!dbLoading}
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
            {/* Login Popup Component
            <GoogleLoginPopUp />*/}
            <ApiError
                title="기능에 접근할 수 없습니다."
                description="현재 구현중인 기능입니다. 업데이트 완료 후 접근 가능합니다."
                open={error}
                setOpen={setError}
            />
        </>
    );
};

export default Home;
