/* eslint-disable @typescript-eslint/ban-ts-comment */
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
    const [map, setMap] = useState({});
    const [checker, setChecker] = useState(false);
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
            for (const index in props.focus[keys]) {
                if (props.focus[keys][index] === true) {
                    console.log(newState);
                    for (const value of getMaterials(keys, Number(index))) {
                        if (Object.keys(newState).includes(value.id)) {
                            console.log("중복 : ", newState[value.id], value);
                            newState[value.id] = {
                                count: newState[value.id].count + value.count,
                                convert: newState[value.id].convert,
                                type: value.type,
                            };
                        } else {
                            newState[value.id] = {
                                count: value.count,
                                convert:
                                    map[value.id] === undefined
                                        ? 0
                                        : map[value.id].convert,
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
            className="w-full bg-gray-200 rounded-3xl transition-all duration-700 origin-top"
            style={{
                marginTop: props.open ? "8px" : "0px",
                height: props.open ? "120px" : "0px",
                transform: `scale(${props.open ? 1 : 0})`,
            }}
        >
            <div className="w-full h-full flex flex-row justify-end items-center">
                <div className="w-24 h-full mr-auto bg-gray-300 relative rounded-l-2xl flex flex-col justify-end items-start pb-2 shadow-right">
                    {/* Labeling */}
                    <div
                        className="h-6 w-18 md:h-8 md:w-24 absolute -top-1 -left-1 bg-yellow-300 flex justify-end items-end"
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
                    <div className="w-full h-auto flex justify-start items-center pl-2">
                        <pre className="text-xl font-bold font-sans">
                            {TITLE_TEXT[props.type]}
                        </pre>
                    </div>
                    <hr className="w-full border-black" />
                    <div className="h-auto w-full flex items-end justify-end pr-1">
                        <pre className="text-xxs font-mono uppercase leading-none text-right">
                            {`CALCULATION:\n${props.type}`}
                        </pre>
                    </div>
                </div>
                <div className="h-full overflow-x-auto flex-grow"></div>
                <div className="w-14 h-full bg-red-800 flex justify-center items-center rounded-r-2xl">
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
    itemId: number;
}
function Item(props: ItemProps): JSX.Element {
    return <div>{props.itemId}</div>;
}

function getMaterialArray() {}
