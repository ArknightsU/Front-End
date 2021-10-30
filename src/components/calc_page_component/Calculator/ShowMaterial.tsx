/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useWindowSize } from "@components";
import { MaterialCalculation } from "@components/common";
import { key } from "localforage";
import { useEffect, useState } from "react";
import { useList, useMap } from "react-use";
interface ShowMaterialProps {
    open: boolean;
    focus: MaterialCalculation;
    char: any;
    type: "total" | "upgrade" | "skill";
}

const TITLE_TEXT = {
    total: "재료\n총합",
    upgrade: "정예화\n재료",
    skill: "스킬\n재료",
};
const TYPE_KEYS = {
    total: ["upgrade", "allSkill", "skill1", "skill2", "skill3"],
    upgrade: ["upgrade"],
    skill: ["allSkill", "skill1", "skill2", "skill3"],
};
export function ShowMaterial(props: ShowMaterialProps): JSX.Element {
    const window_size = useWindowSize();
    const [map, setMap] = useState({});
    const CHAR_KEYS = {
        upgrade: props.char.evolveCost,
        allSkill: props.char.allSkillLvlup,
        skill1: props.char.skillLvlup[0],
        skill2: props.char.skillLvlup[1],
        skill3: props.char.skillLvlup[2],
    };
    const getMaterials = (key: string, index: number): any[] => {
        if (key === "upgrade") {
            return CHAR_KEYS[key][index + 1];
        } else if (key === "allSkill") {
            return CHAR_KEYS[key][index].lvlUpCost;
        } else {
            const array = [];
            // @ts-ignore
            for (const mt of CHAR_KEYS[key][index].levelUpCost) {
                array.push(mt);
            }
            return array;
        }
    };
    const detectPropsLength = () => {
        const detect = [];
        if (props.focus.upgrade !== null) {
            detect.push(...props.focus.upgrade);
        }
        if (props.focus.allSkill !== null) {
            detect.push(...props.focus.allSkill);
        }
        if (props.focus.skill1 !== null) {
            detect.push(...props.focus.skill1);
        }
        if (props.focus.skill2 !== null) {
            detect.push(...props.focus.skill2);
        }
        if (props.focus.skill3 !== null) {
            detect.push(...props.focus.skill3);
        }
        return detect.filter((v) => v === true).length;
    };
    console.log(props.type, ":", map);
    useEffect(() => {
        const newState = {};
        for (const keys of TYPE_KEYS[props.type]) {
            // @ts-ignore
            for (const index in props.focus[keys]) {
                // @ts-ignore
                if (props.focus[keys][index] === true) {
                    console.log(newState);
                    for (const value of getMaterials(keys, Number(index))) {
                        if (Object.keys(newState).includes(value.id)) {
                            // @ts-ignore
                            newState[value.id] = {
                                // @ts-ignore
                                count: newState[value.id].count + value.count,
                                // @ts-ignore
                                convert: newState[value.id].convert,
                                type: value.type,
                            };
                        } else {
                            // @ts-ignore
                            newState[value.id] = {
                                count: value.count,
                                convert:
                                    //@ts-ignore
                                    map[value.id] === undefined
                                        ? 0
                                        : //@ts-ignore
                                          map[value.id].convert,
                                type: value.type,
                            };
                        }
                    }
                    setMap(newState);
                }
            }
        }
    }, [detectPropsLength()]);
    return (
        <div
            className="w-full bg-gray-200 rounded-3xl transition-all duration-700 origin-top relative"
            style={{
                marginTop: props.open ? "12px" : "0px",
                height: props.open ? "auto" : "auto",
                maxHeight: props.open ? "9999px" : "0px",
                transform: `scale(${props.open ? 1 : 0})`,
            }}
        >
            <div className="w-full h-full flex flex-row justify-end items-center">
                <div className="absolute top-0 h-14 w-full md:w-24 md:h-full mr-auto bg-gray-300 md:left-0 rounded-l-2xl flex flex-col justify-center items-center md:justify-end md:items-start pb-2 md:shadow-right flex-shrink-0">
                    {/* Labeling */}
                    <div
                        className="h-6 w-18 md:h-8 md:w-24 absolute -top-4 -left-1 bg-yellow-300 flex justify-end items-end"
                        style={{ zIndex: 12 }}
                    >
                        <div className="h-full w-11/12 bg-black flex flex-row">
                            <div className="h-full w-1/2 flex justify-center items-center">
                                <p className="h-auto w-auto text-truegray-600 font-bold font-mono text-xxs md:text-xs leading-none align-middle pl-0 md:pl-2">
                                    {"DATA\nTYPE./"}
                                </p>
                            </div>
                            <div className="h-full w-1/2 flex justify-center items-center">
                                <p className="h-auto w-auto text-white font-bold font-sans text-xs md:text-sm leading-none align-middle text-center">
                                    {
                                        // @ts-ignore
                                        "LIST"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* TITLE */}
                    <div className="w-full h-auto flex justify-center md:justify-start items-center pl-2">
                        {window_size.width < 768 ? (
                            <p className="text-md font-bold">
                                {TITLE_TEXT[props.type]}
                            </p>
                        ) : (
                            <pre className="text-xl font-bold font-sans">
                                {TITLE_TEXT[props.type]}
                            </pre>
                        )}
                    </div>
                    <hr className="w-full border-black" />
                    <div className="h-auto w-full flex items-end justify-end pr-14 md:pr-1">
                        <pre className="text-xxs font-mono uppercase leading-none text-right">
                            {`CALCULATION:\n${props.type}`}
                        </pre>
                    </div>
                </div>
                {/* Contents */}
                <div className="h-auto w-full pr-0 pl-4 md:pr-14 pl-18 md:pl-24">
                    <ul className="h-auto w-full flex-row flex gap-x-2 gap-y-2 flex-wrap justify-start items-center pt-14 md:pt-0">
                        {Object.keys(map).map((id, idx) => (
                            <li className="w-auto h-auto">
                                <Item itemId={id} />
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Close Button */}
                <div className="absolute -top-1 md:top-auto right-0 md:right-0 w-14 md:h-full h-14 bg-red-800 flex justify-center items-center rounded-2xl md:rounded-l-none md:rounded-r-2xl flex-shrink-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-2/3 w-2/3"
                        viewBox="0 0 20 20"
                        fill="#fff"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
interface ItemProps {
    itemId: string;
}
function Item(props: ItemProps): JSX.Element {
    return (
        <div className="w-24 md:w-28 bg-black" style={{ height: "100px" }}>
            {props.itemId}
        </div>
    );
}
