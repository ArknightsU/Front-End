/* eslint-disable @typescript-eslint/ban-ts-comment */
import { HorizontalGoogleAds } from "@components/common/GoogleAds";
import React, { useEffect, useRef, useState } from "react";
import { getItem, useCharFilterArray } from "@components/common/LocalForge";
import { RARITY, PROFESSION } from "@constants";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { useWindowSize } from "@components/hooks/useWindowSize";
import { CharSelector } from "./CharSelecter";
import { Calculator } from "./Calculator/Calculator";
import { GoBackLinkButton, MaterialCalculation } from "@components/common";
import { EveryMaterials } from "./EveryMaterials";
import { MaterialMap } from "../common/Type/MaterialMap";
import { DB_NAME } from "../common/LocalForge/db_name";
import AKLEVEL from "@public/json/common/aklevel.json";

export function CalcMain(): JSX.Element {
    const [allMaterial, setAllMaterial] = useState<MaterialMap>({});
    // State: rarity filter array
    const [rarity, setRarity] = useState<Array<string>>([RARITY.six]);
    // State: profession filter array
    const [profession, setProfession] = useState<Array<string>>([
        PROFESSION.warrior,
    ]);
    // State: selected characters array
    const [focused, setFocused] = useState<Array<MaterialCalculation>>([]);
    const [charNameArray, Loading] = useCharFilterArray(rarity, profession);
    // get ads' height and calculate main component
    const ads = useRef<HTMLDivElement>(null);
    const window_size = useWindowSize();
    useEffect(() => {
        if (focused === []) return;
        async function changeAllMaterial() {
            const newState = {};
            for (const focus of focused) {
                const char_obj = await getItem(
                    DB_NAME.character_table,
                    focus.name,
                );
                for (const keys of Object.keys(focus)) {
                    if (keys === "name") continue;
                    // @ts-ignore
                    for (const index in focus[keys]) {
                        // @ts-ignore
                        if (focus[keys][index] === true) {
                            for (const value of getMaterials(
                                char_obj,
                                keys,
                                Number(index),
                            )) {
                                if (Object.keys(newState).includes(value.id)) {
                                    // @ts-ignore
                                    newState[value.id] = {
                                        count:
                                            // @ts-ignore
                                            newState[value.id].count +
                                            value.count,
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
                                            allMaterial[value.id] === undefined
                                                ? 0
                                                : //@ts-ignore
                                                  allMaterial[value.id].convert,
                                        type: value.type,
                                    };
                                }
                            }
                            //setMap(newState);
                        }
                    }
                }
            }
            setAllMaterial(newState);
        }
        changeAllMaterial();
    }, [focused]);
    return (
        <div className="w-screen h-screen relative flex flex-col bg-white dark:bg-gray-900">
            {/* Google Ads */}
            <div ref={ads} className="w-full h-auto absolute top-0 z-70">
                {<HorizontalGoogleAds />}
            </div>
            {/* Loading Component Start */}
            {Loading ? (
                <div className="w-full h-full absolute top-0 flex justify-center items-center backdrop-filter backdrop-blur-lg z-animation">
                    <div
                        className="flex flex-col p-5 bg-white dark:bg-gray-700 rounded-lg drop-shadow-bottom justify-center items-center"
                        style={{
                            width: window_size.width / 3,
                            height: window_size.width / 3,
                        }}
                    >
                        <EclipseSpinner />
                        <span className="text-lg md:text-xl text-black dark:text-white font-bold flex justify-center items-center">
                            {"오퍼레이터 정보를 불러오는 중"}
                        </span>
                    </div>
                </div>
            ) : (
                <></>
            )}
            {/* Loading Component End */}
            <div
                className="w-full absolute overflow-hidden pb-10 z-10"
                style={{
                    height: `calc(100% - ${
                        ads.current ? ads.current.offsetHeight : 0
                    }px)`,
                    top: `${ads.current ? ads.current.offsetHeight : 0}px`,
                }}
            >
                <GoBackLinkButton
                    zIndex={9}
                    top={20}
                    left={window_size.width < 768 ? 10 : 40}
                />
                <EveryMaterials map={allMaterial} setMap={setAllMaterial} />
                <CharSelector
                    rarity={rarity}
                    setRarity={setRarity}
                    profession={profession}
                    setProfession={setProfession}
                    charNameArray={charNameArray}
                    focused={focused}
                    setFocused={setFocused}
                />
                <Calculator focused={focused} setFocused={setFocused} />
            </div>
        </div>
    );
}
// rarity value stored in DB is text, convert to number
const RARITY_KEYS = {
    six: 5,
    five: 4,
    four: 3,
    three: 2,
    two: 1,
    one: 0,
};
// extract data that using in this componenet

const EVOLVE_GOLD_COST = AKLEVEL.evolveGoldCost;
const getMaterials = (char: any, key: string, index: number): any[] => {
    const CHAR_KEYS = {
        upgrade: char.evolveCost,
        allSkill: char.allSkillLvlup,
        skill1: char.skillLvlup[0],
        skill2: char.skillLvlup[1],
        skill3: char.skillLvlup[2],
    };
    if (key === "upgrade") {
        const EVOLVE_GOLD_COST_OBJ = {
            id: "4001",
            // @ts-ignore
            count: EVOLVE_GOLD_COST[RARITY_KEYS[char.rarity]][index],
            type: "GOLD",
        };
        return [...CHAR_KEYS[key][index + 1], EVOLVE_GOLD_COST_OBJ];
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
