/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DB_NAME, GachaPool, getItem } from "@components/common";
import { ToggleSwitch } from "@components/common/ToggleSwitch";
import { useEffect, useState } from "react";
import { getAllfeaturedCharacters } from "../getAllfeaturedCharacters";
import { DetailChildLayout } from "./DetailChildLayout";
import { EveryOperators } from "./EveryOperators";
import { DataTalbe } from "./GachaDetail";
import { PieChart } from "./PieChar";

interface ClientStatsProps {
    pools: Array<GachaPool>;
    focused: number;
    gachaData: any;
}
export function ClientStats(props: ClientStatsProps): JSX.Element {
    const [sortBy, setSortBy] = useState(false);
    const [openGraph, setOpenGraph] = useState(false);
    const [openAll, setOpenAll] = useState(false);
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
            for (const char of props.gachaData) {
                const data = await getItem(DB_NAME.character_table, char);
                // @ts-ignore
                returnData[data["rarity"]] = returnData[data["rarity"]] + 1;
                if (
                    getAllfeaturedCharacters(
                        props.pools[props.focused],
                    ).includes(char)
                ) {
                    // @ts-ignore
                    returnHitData[data["rarity"]] =
                        // @ts-ignore
                        returnHitData[data["rarity"]] + 1;
                }
            }
            return [returnData, returnHitData];
        }
        Data().then((result) => {
            setGraphData(result[0]);
            setHitData(result[1]);
        });
    }, [props.gachaData.length]);
    return (
        <>
            <DetailChildLayout
                title="시뮬레이션 확률 - 클라이언트"
                parentControlOpen={openGraph}
                setParentControlOpen={setOpenGraph}
            >
                <div className="w-full h-auto flex flex-col font-ibm-korean font-bold text-truegray-800">
                    <div className="w-full h-10 flex flex-row items-center">
                        <InfoIcon />
                        <p className="text-lg">{"그래프"}</p>
                    </div>
                    <div className="w-full h-96">
                        {props.gachaData.length === 0 ? (
                            <div className="w-full h-full flex justify-center items-center">
                                <p className="text-xl">
                                    {"데이터가 존재하지 않습니다."}
                                </p>
                            </div>
                        ) : (
                            <PieChart
                                data={refinedGraphData}
                                length={props.gachaData.length}
                            />
                        )}
                    </div>
                    <div className="w-full h-10 flex flex-row items-center">
                        <InfoIcon />
                        <p className="text-lg">{"상세 정보"}</p>
                    </div>
                    <div className="w-full h-40 flex justify-center items-center">
                        <DataTalbe allData={graphData} hitData={hitData} />
                    </div>
                </div>
            </DetailChildLayout>
            <DetailChildLayout
                title="출현 오퍼레이터 - 클라이언트"
                parentControlOpen={openAll}
                setParentControlOpen={setOpenAll}
            >
                <div className="w-full h-auto flex flex-col font-ibm-korean font-bold text-truegray-800 mb-6">
                    <div className="w-full h-auto flex flex-row justify-start items-center">
                        <InfoIcon />
                        <p className="text-lg">{"정렬 기준"}</p>
                    </div>
                    <div className="w-full h-auto flex flex-row justify-start items-center mt-4 ml-4 gap-x-2">
                        <p className="text-base">{"횟수"}</p>
                        <ToggleSwitch checked={sortBy} setChecked={setSortBy} />
                        <p className="text-base">{"레어도"}</p>
                    </div>
                </div>
                <div className="w-full h-auto flex flex-row justify-start items-center font-ibm-korean font-bold text-truegray-800 mb-6">
                    <InfoIcon />
                    <p className="text-lg">{"데이터"}</p>
                </div>
                <EveryOperators sortBy={sortBy} data={props.gachaData} />
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
