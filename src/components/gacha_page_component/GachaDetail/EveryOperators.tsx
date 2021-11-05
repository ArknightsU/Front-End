/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getItem } from "@components";
import { DB_NAME } from "@components/common";
import { useEffect, useState } from "react";
import { CharMinify } from "../GachaAnimation/CharMinify";

interface EveryOperatorsProps {
    data: string[];
}
export function EveryOperators(props: EveryOperatorsProps): JSX.Element {
    const [data, setData] = useState({});
    console.log(data);
    useEffect(() => {
        async function Data() {
            const returnData = {};
            for (const char of props.data) {
                // @ts-ignore
                if (!Object.keys(returnData).includes(char)) {
                    // @ts-ignore
                    returnData[char] = 1;
                } else {
                    // @ts-ignore
                    returnData[char] = returnData[char] + 1;
                }
            }
            return returnData;
        }
        Data().then((result) => {
            setData(result);
        });
    }, [props.data.length]);
    return (
        <div className="w-full h-auto flex flex-row items-center justify-start gap-x-4 gap-y-4 flex-wrap font-ibm-korean font-bold text-truegray-800">
            {Object.keys(data)
                .sort((a, b) => {
                    // @ts-ignore
                    return data[b] - data[a];
                })
                .map((char) => (
                    <div className="w-24 h-auto flex flex-col">
                        <CharMinify charName={char} />
                        <div className="w-24 h-auto flex justify-center items-start">
                            <p className="text-truegray-700 font-ibm-korean font-bold text-base md:text-lg">
                                {
                                    // @ts-ignore
                                    data[char] + "회"
                                }
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}