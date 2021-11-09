/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { DetailChildLayout } from "./DetailChildLayout";
import { EveryOperators } from "./EveryOperators";
import { DataTalbe } from "./GachaDetail";
import { PieChart } from "./PieChar";
import { SERVER_URL_GACHA_STATISTICS } from "../../../constants/urls";
import { getAllfeaturedCharacters } from "../getAllfeaturedCharacters";
import { GachaPool, getItem } from "@components";
import { DB_NAME } from "@components";
import { ServerEveryOperators } from "./ServerEveryOperators";
import { ToggleSwitch } from "@components/common/ToggleSwitch";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
/**
 * Server version of ClientStats.tsx
 * Refer ClientStats.tsx
 * Difference is tiny part of data processing
 */
interface ServerStatsProps {
    focused: number;
    pools: Array<GachaPool>;
}
export interface StatisticsData {
    [key: string]: number;
}
export function ServerStats(props: ServerStatsProps): JSX.Element {
    const [openGraph, setOpenGraph] = useState(false);
    const [openAll, setOpenAll] = useState(false);
    const [loading, setLoading] = useState(false);
    const [gachaData, setGachaData] = useState<StatisticsData>({});
    const [sortBy, setSortBy] = useState(false);
    const [length, setLength] = useState(0);
    const [toggleData, setToggleData] = useState(false);
    // Enforce Data fetch
    const isFirstRenderForForcedUpdate = useRef(false);
    useEffect(() => {
        if (!isFirstRenderForForcedUpdate.current) {
            isFirstRenderForForcedUpdate.current = true;
            return;
        }
        setLoading(true);
        fetchData();
    }, [toggleData]);
    const getDataFromServer = () => {
        if (resetCooldown !== 0) {
            return;
        }
        setToggleData((prev) => !prev);
        setResetCooldown(3);
    };
    // reset button state & action
    const [resetCooldown, setResetCooldown] = useState(0);
    // reset timer
    useEffect(() => {
        if (resetCooldown <= 0) {
            setResetCooldown(0);
            return;
        }
        setTimeout(() => {
            setResetCooldown((prev) => prev - 1);
        }, 1000);
    }, [resetCooldown]);
    // First Render Check
    // Statistics Data is big, so if user not activated, do not get data from api server
    const isFirstRender = useRef(false);
    const fetchData = () => {
        setLoading(true);
        axios
            .get(SERVER_URL_GACHA_STATISTICS(props.pools[props.focused].id))
            .then((data) => {
                setGachaData(data.data.statistic);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                console.log(e);
            });
    };
    useEffect(() => {
        console.log(openGraph, openAll);
        if (!isFirstRender.current) {
            isFirstRender.current = true;
            return;
        }
        if (Object.keys(gachaData).length !== 0) return;
        else {
            fetchData();
        }
    }, [openGraph, openAll]);
    const [graphData, setGraphData] = useState({
        six: 0,
        five: 0,
        four: 0,
        three: 0,
    });
    const [hitData, setHitData] = useState({
        six: 0,
        five: 0,
        four: 0,
        three: 0,
    });
    const colorMap = [
        "hsl(215, 70%, 50%)",
        "hsl(153, 70%, 50%)",
        "hsl(291, 70%, 50%)",
        "hsl(18, 70%, 50%)",
    ];
    const labelMap = ["★6", "★5", "★4", "★3"];
    const refinedGraphData = Object.keys(graphData).map((v, idx) => {
        return {
            id: labelMap[idx],
            label: labelMap[idx],
            // @ts-ignore
            value: graphData[v],
            color: colorMap[idx],
        };
    });
    useEffect(() => {
        async function Data() {
            const returnData = {
                six: 0,
                five: 0,
                four: 0,
                three: 0,
            };
            const returnHitData = {
                six: 0,
                five: 0,
                four: 0,
                three: 0,
            };
            for (const char of Object.keys(gachaData)) {
                const data = await getItem(DB_NAME.character_table, char);
                // @ts-ignore
                returnData[data["rarity"]] =
                    // @ts-ignore
                    returnData[data["rarity"]] + gachaData[char];
                setLength((prev) => prev + gachaData[char]);
                if (
                    getAllfeaturedCharacters(
                        props.pools[props.focused],
                    ).includes(char)
                ) {
                    // @ts-ignore
                    returnHitData[data["rarity"]] =
                        // @ts-ignore
                        returnHitData[data["rarity"]] + gachaData[char];
                }
            }
            return [returnData, returnHitData];
        }
        Data().then((result) => {
            setGraphData(result[0]);
            setHitData(result[1]);
        });
    }, [Object.keys(gachaData).length]);
    return (
        <>
            <DetailChildLayout
                title="시뮬레이션 확률 - 서버"
                parentControlOpen={openGraph}
                setParentControlOpen={setOpenGraph}
            >
                <div className="w-full h-auto flex flex-col font-ibm-korean font-bold text-truegray-800">
                    {loading ? (
                        <div className="w-full h-64 flex-col flex justify-center items-center">
                            <EclipseSpinner />
                            <p className="text-lg">{"데이터 취득 중..."}</p>
                        </div>
                    ) : (
                        <>
                            <div className="w-full h-10 flex flex-row items-center">
                                <InfoIcon />
                                <p className="text-lg">{"데이터 갱신"}</p>
                            </div>
                            <div className="w-full h-auto">
                                <div
                                    className="w-32 h-12 bg-red-600 hover:bg-red-700 rounded-lg flex justify-center items-center active:border-2 border-0 border-amber-300"
                                    onClick={getDataFromServer}
                                >
                                    <p className="text-lg text-white">
                                        {resetCooldown !== 0
                                            ? `쿨타임 (${resetCooldown}s)`
                                            : "갱신"}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-10 flex flex-row items-center">
                                <InfoIcon />
                                <p className="text-lg">{"그래프"}</p>
                            </div>
                            <div className="w-full h-96">
                                {Object.keys(gachaData).length === 0 ? (
                                    <div className="w-full h-full flex justify-center items-center">
                                        <p className="text-xl">
                                            {"데이터가 존재하지 않습니다."}
                                        </p>
                                    </div>
                                ) : openGraph ? (
                                    <PieChart
                                        data={refinedGraphData}
                                        length={length}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="w-full h-10 flex flex-row items-center">
                                <InfoIcon />
                                <p className="text-lg">{"상세 정보"}</p>
                            </div>
                            <div className="w-full h-40 flex justify-center items-center">
                                {openGraph ? (
                                    <DataTalbe
                                        allData={graphData}
                                        hitData={hitData}
                                    />
                                ) : (
                                    <></>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </DetailChildLayout>
            <DetailChildLayout
                title="출현 오퍼레이터 - 서버"
                parentControlOpen={openAll}
                setParentControlOpen={setOpenAll}
            >
                {loading ? (
                    <div className="w-full h-64 flex-col flex font-ibm-korean font-bold text-truegray-800 justify-center items-center">
                        <EclipseSpinner />
                        <p className="text-lg">{"데이터 취득 중..."}</p>
                    </div>
                ) : (
                    <>
                        <div className="w-full h-auto flex flex-col font-ibm-korean font-bold text-truegray-800 mb-6">
                            <div className="w-full h-10 flex flex-row items-center">
                                <InfoIcon />
                                <p className="text-lg">{"데이터 갱신"}</p>
                            </div>
                            <div className="w-full h-auto">
                                <div
                                    className="w-32 h-12 bg-red-600 hover:bg-red-700 rounded-lg flex justify-center items-center active:border-2 border-0 border-amber-300"
                                    onClick={getDataFromServer}
                                >
                                    <p className="text-lg text-white">
                                        {resetCooldown !== 0
                                            ? `쿨타임 (${resetCooldown}s)`
                                            : "갱신"}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full h-auto flex flex-row justify-start items-center">
                                <InfoIcon />
                                <p className="text-lg">{"정렬 기준"}</p>
                            </div>
                            <div className="w-full h-auto flex flex-row justify-start items-center mt-4 ml-4 gap-x-2">
                                <p className="text-base">{"횟수"}</p>
                                <ToggleSwitch
                                    checked={sortBy}
                                    setChecked={setSortBy}
                                />
                                <p className="text-base">{"레어도"}</p>
                            </div>
                        </div>
                        <div className="w-full h-auto flex flex-row justify-start items-center font-ibm-korean font-bold text-truegray-800 mb-6">
                            <InfoIcon />
                            <p className="text-lg">{"데이터"}</p>
                        </div>
                        {openAll ? (
                            <ServerEveryOperators
                                data={gachaData}
                                sortBy={sortBy}
                            />
                        ) : (
                            <></>
                        )}
                    </>
                )}
            </DetailChildLayout>
        </>
    );
}

const InfoIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
            />
        </svg>
    );
};
