/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getItem } from "@components";
import { DB_NAME } from "@components/common";
import { useEffect, useState } from "react";
import { CharMinify } from "../GachaAnimation/CharMinify";
import { StatisticsData } from "./ServerStats";

interface ServerEveryOperatorsProps {
    data: StatisticsData;
    sortBy: boolean;
}
interface RefinedData {
    [key: string]: {
        number: number;
        rarity: number;
    };
}
const RARITY_MAP = { six: 5, five: 4, four: 3, three: 2, two: 1, one: 0 };
export function ServerEveryOperators(
    props: ServerEveryOperatorsProps,
): JSX.Element {
    const [data, setData] = useState<RefinedData>({});
    useEffect(() => {
        async function Data() {
            const returnData = {};
            for (const char of Object.keys(props.data)) {
                const charData = await getItem(DB_NAME.character_table, char);
                // @ts-ignore
                returnData[char] = {
                    number: props.data[char],
                    // @ts-ignore
                    rarity: RARITY_MAP[charData.rarity],
                };
            }
            return returnData;
        }
        Data().then((result) => {
            setData(result);
        });
    }, [props.data.length]);
    return (
        <div className="w-full h-auto flex flex-row items-center justify-start gap-x-4 gap-y-4 flex-wrap font-ibm-korean font-bold text-truegray-800">
            {Object.keys(props.data).length === 0 ? (
                <div className="w-full h-auto p-8 flex justify-center items-center">
                    <p className="text-xl font-bold">
                        {"데이터가 존재하지 않습니다."}
                    </p>
                </div>
            ) : (
                (props.sortBy === false
                    ? Object.keys(data)
                          .sort((a, b) => data[b].rarity - data[a].rarity)
                          .sort((a, b) => data[b].number - data[a].number)
                    : Object.keys(data)
                          .sort((a, b) => data[b].number - data[a].number)
                          .sort((a, b) => data[b].rarity - data[a].rarity)
                ).map((char, idx) => (
                    <div className="w-24 h-auto flex flex-col" key={idx}>
                        <CharMinify charName={char} />
                        <div className="w-24 h-auto flex justify-center items-start">
                            <p className="text-truegray-700 font-ibm-korean font-bold text-base md:text-lg">
                                {
                                    // @ts-ignore
                                    data[char].number + "회"
                                }
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
