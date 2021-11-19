/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CustomImage, useWindowSize } from "@components";
import { MaterialCalculation } from "@components/common";
import { useEffect, useState } from "react";
import { getMaterialObject } from "./getMaterialObject";
import AKLEVEL from "@public/json/common/aklevel.json";
import { Flipped, Flipper } from "react-flip-toolkit";
import { getProcess } from "./getMaterialObject";
interface ShowMaterialProps {
    open: boolean;
    setClose: () => void;
    focus: MaterialCalculation;
    char: any;
    type: "total" | "upgrade" | "skill";
}
// Left title text map
const TITLE_TEXT = {
    total: "재료\n총합",
    upgrade: "정예화\n재료",
    skill: "스킬\n재료",
};
// Keys for iteration
const TYPE_KEYS = {
    total: ["upgrade", "allSkill", "skill1", "skill2", "skill3"],
    upgrade: ["upgrade"],
    skill: ["allSkill", "skill1", "skill2", "skill3"],
};
// rarity value stored in DB is text, convert to number
const RARITY_KEYS = {
    six: 5,
    five: 4,
    four: 3,
    three: 2,
    two: 1,
    one: 0,
};
const EVOLVE_GOLD_COST = AKLEVEL.evolveGoldCost;
export function ShowMaterial(props: ShowMaterialProps): JSX.Element {
    const window_size = useWindowSize();
    // using map state
    const [map, setMap] = useState({});
    // FLIP animation uses text state checker.
    const mapToAnimationKey = () => {
        let text = "";
        for (const keys of Object.keys(map)) {
            // @ts-ignore
            for (const innerKeys of Object.keys(map[keys])) {
                // @ts-ignore
                text = text + map[keys][innerKeys];
            }
        }
        return text;
    };
    // extract data that using in this componenet
    const CHAR_KEYS = {
        upgrade: props.char.evolveCost,
        allSkill: props.char.allSkillLvlup,
        skill1: props.char.skillLvlup[0],
        skill2: props.char.skillLvlup[1],
        skill3: props.char.skillLvlup[2],
    };
    // get target material array
    const getMaterials = (key: string, index: number): any[] => {
        if (key === "upgrade") {
            const EVOLVE_GOLD_COST_OBJ = {
                id: "4001",
                // @ts-ignore
                count: EVOLVE_GOLD_COST[RARITY_KEYS[props.char.rarity]][index],
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
    // check count of "TRUE" in props.focus
    // if it changes, update map
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
    // map update function
    useEffect(() => {
        const newState = {};
        for (const keys of TYPE_KEYS[props.type]) {
            // @ts-ignore
            for (const index in props.focus[keys]) {
                // @ts-ignore
                if (props.focus[keys][index] === true) {
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
                    //setMap(newState);
                }
            }
        }
        setMap(newState);
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
                <div className="absolute top-0 h-14 w-full md:w-24 md:h-full mr-auto bg-gray-300 md:left-0 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl flex flex-col justify-center items-center md:justify-end md:items-start pb-2 md:shadow-right flex-shrink-0">
                    {/* Labeling */}
                    <div
                        className="h-6 w-18 md:h-8 md:w-24 absolute -top-4 -left-1 bg-yellow-300 flex justify-end items-end"
                        style={{ zIndex: 1 }}
                    >
                        <div className="h-full w-11/12 bg-black flex flex-row z-0">
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
                    <Flipper flipKey={mapToAnimationKey()} spring="stiff">
                        <ul className="h-auto w-full flex-row flex gap-x-2 gap-y-2 flex-wrap justify-start items-center pt-14 md:pt-0">
                            {Object.keys(map).length === 0 ? (
                                <div className="w-full h-24 flex justify-center items-center">
                                    <p className="text-2xl font-mono uppercase font-extrabold text-truegray-600">
                                        {"NO DATA"}
                                    </p>
                                </div>
                            ) : (
                                // sort map into rarity level
                                Object.keys(map)
                                    .sort((a, b) => {
                                        const materialA = getMaterialObject(a);
                                        const materialB = getMaterialObject(b);
                                        if (
                                            materialA.rarity ===
                                            materialB.rarity
                                        ) {
                                            return (
                                                Number(materialB.sortId) -
                                                Number(materialA.sortId)
                                            );
                                        } else {
                                            return (
                                                Number(materialB.rarity) -
                                                Number(materialA.rarity)
                                            );
                                        }
                                    })
                                    .map((id, idx) => (
                                        <Flipped flipId={id} key={idx} stagger>
                                            <li className="w-auto h-auto">
                                                <Item
                                                    map={map}
                                                    setMap={setMap}
                                                    itemId={id}
                                                    // @ts-ignore
                                                    itemDetail={map[id]}
                                                />
                                            </li>
                                        </Flipped>
                                    ))
                            )}
                        </ul>
                    </Flipper>
                </div>
                {/* Close Button */}
                <div
                    className="absolute -top-1 md:top-auto right-0 md:right-0 w-14 md:h-full h-14 bg-red-800 flex justify-center items-center rounded-2xl md:rounded-l-none md:rounded-r-2xl flex-shrink-0"
                    onClick={props.setClose}
                >
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
    itemDetail: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    map: any;
    // eslint-disable-next-line @typescript-eslint/ban-types
    setMap: React.Dispatch<React.SetStateAction<{}>>;
}
const chipsets = [
    "3212",
    "3222",
    "3232",
    "3242",
    "3252",
    "3262",
    "3272",
    "3282",
    "3211",
    "3221",
    "3231",
    "3241",
    "3251",
    "3261",
    "3271",
    "3281",
];
function Item(props: ItemProps): JSX.Element {
    const [isHover, setIsHover] = useState(false);
    const Material_Object = getMaterialObject(props.itemId);
    const src = `/img/items/${Material_Object.iconId}.webp`;
    const rarity_img_src = `/img/material/bg/item-${
        Number(Material_Object.rarity) + 1
    }.webp`;
    // check decomposible
    const isDecomposible = () => {
        // if roomtype none undecomposible
        if (Material_Object.buildingProductList.roomType === undefined) {
            return false;
            // if item is chipset, then undecomposible
        } else if (chipsets.includes(Material_Object.itemId)) {
            return false;
            // if item's count is below 0, then undecomposible
        } else if (props.itemDetail.count <= 0) {
            return false;
        } else return true;
    };
    // decompose function
    const handleDecomposition = () => {
        // if mouse not entered, then return
        if (!isHover) return;
        // if undecomposible, then return
        if (!isDecomposible()) {
            return;
        }
        // map change
        props.setMap((prev) => {
            const newMap = Object.assign({}, prev);
            // Get decompose/synthesize process from json
            const decomposeArray = getProcess(
                Material_Object.buildingProductList.roomType,
                Material_Object.buildingProductList.formulaId,
            );
            // convert ++
            // @ts-ignore
            newMap[props.itemId].convert =
                // @ts-ignore
                Number(newMap[props.itemId].convert) + 1;
            // count --
            // @ts-ignore
            newMap[props.itemId].count = Number(newMap[props.itemId].count) - 1;
            // child item change convert, count
            for (const itemObject of decomposeArray) {
                if (Object.keys(newMap).includes(itemObject.id)) {
                    // @ts-ignore
                    newMap[itemObject.id].count =
                        // @ts-ignore
                        Number(newMap[itemObject.id].count) +
                        Number(itemObject.count);
                } else {
                    // @ts-ignore
                    newMap[itemObject.id] = {
                        count: itemObject.count,
                        convert: 0,
                        type: "MATERIAL",
                    };
                }
            }
            return newMap;
        });
    };
    // check synthisizable
    const isSynthisizable = () => {
        // if convert below 0, return false
        if (props.itemDetail.convert >= 1) {
            // Get decompose/synthesize process from json
            const synthesizeArray = getProcess(
                Material_Object.buildingProductList.roomType,
                Material_Object.buildingProductList.formulaId,
            );
            // If child item is decomposed to below 0, then return false
            for (const lowMaterialObject of synthesizeArray) {
                if (props.map[lowMaterialObject.id].count <= 0) {
                    return false;
                }
            }
            return true;
        } else return false;
    };
    // synthisize function
    const handleSynthisize = () => {
        // if mouse not entered, then return
        if (!isHover) return;
        // if unsynthisizable, then return
        if (!isSynthisizable()) return;
        props.setMap((prev) => {
            const newMap = Object.assign({}, prev);
            // Get decompose/synthesize process from json
            const synthesizeArray = getProcess(
                Material_Object.buildingProductList.roomType,
                Material_Object.buildingProductList.formulaId,
            );
            // convert --
            // @ts-ignore
            newMap[props.itemId].convert =
                // @ts-ignore
                Number(newMap[props.itemId].convert) - 1;
            // count ++
            // @ts-ignore
            newMap[props.itemId].count = Number(newMap[props.itemId].count) + 1;
            for (const lowMaterialObject of synthesizeArray) {
                // mother component synthesize, then decrease child component.
                // @ts-ignore
                newMap[lowMaterialObject.id].count =
                    // @ts-ignore
                    Number(newMap[lowMaterialObject.id].count) -
                    lowMaterialObject.count;
                // if child component's convert and count is 0, then delete item from the map
                if (
                    // @ts-ignore
                    newMap[lowMaterialObject.id].count === 0 &&
                    // @ts-ignore
                    newMap[lowMaterialObject.id].convert === 0
                ) {
                    // @ts-ignore
                    delete newMap[lowMaterialObject.id];
                }
            }
            // if parent component's convert and count is 0, then delete item from the map
            // @ts-ignore
            if (newMap[props.itemId].count === 0) {
                // @ts-ignore
                delete newMap[props.itemId];
            }
            return newMap;
        });
    };
    // alter state
    // notify changes of count, convert
    const [alert, setAlert] = useState(false);
    useEffect(() => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 500);
    }, [props.itemDetail.convert, props.itemDetail.count]);
    return (
        <div
            className="w-24 md:w-28 relative"
            style={{ height: "100px" }}
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
        >
            {/* Image Background */}
            <div className="w-full h-full absolute top-0 left-0">
                <div className="w-full h-full relative">
                    <CustomImage src={rarity_img_src} />
                </div>
            </div>
            {/* Main Material Image */}
            <div
                className="w-full h-full relative transform"
                style={{ transform: `scale(0.85)` }}
            >
                <CustomImage src={src} />
            </div>
            {/* Counter Component */}
            <div className="w-full h-1/5 flex justify-end flex-row absolute right-0 bottom-0">
                {props.itemDetail.convert > 0 ? (
                    <div className="w-1/3 h-full bg-red-600 flex justify-center items-center">
                        <p
                            className={`${
                                alert
                                    ? "text-yellow-400 "
                                    : "text-white duration-300"
                            } font-extrabold text-lg transition-colors`}
                        >
                            {props.itemDetail.convert}
                        </p>
                    </div>
                ) : (
                    <></>
                )}
                <div className="w-2/5 h-full bg-blue-500 flex justify-center items-center">
                    <p
                        className={`${
                            alert
                                ? "text-yellow-400 "
                                : "text-white duration-300"
                        } font-extrabold text-lg transition-colors`}
                    >
                        {props.itemId === "4001"
                            ? `${props.itemDetail.count / 10000}만` // exception for gold
                            : props.itemDetail.count}
                    </p>
                </div>
            </div>
            {/* Hover-Appear Component */}
            <div
                className="absolute w-full h-full top-0 left-0 flex flex-col justify-center items-center transition-all duration-700"
                style={{ opacity: isHover ? 1 : 0 }}
            >
                {/* Material Name */}
                <div className="w-full h-1/2 rounded-lg mb-1 bg-black bg-opacity-50 flex justify-center items-center text-center">
                    <p className="text-white font-extrabold text-md md:text-md">
                        {Material_Object.name_kr}
                    </p>
                </div>
                {/* Synthesize Button */}
                <div className="w-full h-1/2 flex flex-row">
                    <div
                        className="w-1/2 h-full rounded-lg mr-1 bg-black bg-opacity-50 flex justify-center items-center border-0 border-solid active:border-2 border-amber-300"
                        onClick={handleSynthisize}
                    >
                        <p
                            className={`${
                                isSynthisizable()
                                    ? "text-white"
                                    : "text-red-600"
                            } font-extrabold text-md md:text-lg text-center`}
                        >
                            {isSynthisizable() ? "합성" : "합성\n불가"}
                        </p>
                    </div>
                    {/* Decompose Button */}
                    <div
                        className="w-1/2 h-full rounded-lg bg-black bg-opacity-50 flex justify-center items-center border-0 border-solid active:border-2 border-amber-300"
                        onClick={handleDecomposition}
                    >
                        <p
                            className={`${
                                isDecomposible() ? "text-white" : "text-red-600"
                            } font-extrabold text-md md:text-lg text-center`}
                        >
                            {isDecomposible() ? "분해" : "분해\n불가"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
