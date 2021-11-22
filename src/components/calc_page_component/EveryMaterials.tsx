/* eslint-disable @typescript-eslint/ban-ts-comment */
import { SetStateAction, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { useWindowSize } from "..";
import { MaterialMap } from "../common/Type/MaterialMap";
import { getMaterialObject } from "./Calculator/getMaterialObject";
import { Item } from "./Calculator/ShowMaterial";

interface EveryMaterialsProps {
    map: MaterialMap;
    setMap: React.Dispatch<SetStateAction<MaterialMap>>;
}
export function EveryMaterials({
    map,
    setMap,
}: EveryMaterialsProps): JSX.Element {
    const [open, setOpen] = useState(false);
    const screen_size = useWindowSize();
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
    return (
        <>
            <div
                className={`absolute w-20 h-14 md:w-44 md:h-14 ${
                    open ? "bg-red-600" : "bg-green-600"
                } rounded-lg bg-opacity-100 opacity-100 shadow-xl text-white font-bold font-ibm-korean flex justify-center items-center transition-all duration-700`}
                style={{
                    width: open
                        ? "95%"
                        : screen_size.width > 768
                        ? "176px"
                        : "80px",
                    zIndex: 9,
                    top: "20px",
                    right: screen_size.width > 768 ? "40px" : "10px",
                }}
                onClick={() => {
                    setOpen((prev) => !prev);
                }}
            >
                {open ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <p>{"모든 재료"}</p>
                )}
            </div>
            <div
                className={`absolute bg-gray-200 dark:bg-gray-600 transition-all duration-700 origin-top-right rounded-lg overflow-y-auto`}
                style={{
                    zIndex: 11,
                    width: open ? "95%" : "0px",
                    height: open ? `${screen_size.height - 200}px` : "0px",
                    right: screen_size.width > 768 ? "40px" : "10px",
                    top: "76px",
                }}
            >
                <div className="h-auto w-full pr-0 pl-4 md:pr-14 pl-18 md:pl-24">
                    {open ? (
                        <>
                            <div className="h-auto w-full flex justify-start items-center mt-4">
                                <div className="w-full h-full">
                                    <p className="text-lg md:text-2xl font-ibm-korean font-bold text-truegray-700 dark:text-white">
                                        {"모든 재료 총합"}
                                    </p>
                                </div>
                            </div>
                            <div className="border border-solid w-full mb-5 mt-2 border-black dark:border-white"></div>
                            <Flipper
                                flipKey={mapToAnimationKey()}
                                spring="stiff"
                            >
                                <ul className="h-auto w-full flex-row flex gap-x-2 gap-y-2 flex-wrap justify-start items-center pt-14 md:pt-0">
                                    {Object.keys(map).length === 0 ? (
                                        <div className="w-full h-24 flex justify-center items-center">
                                            <p className="text-2xl font-mono uppercase font-extrabold text-truegray-600 dark:text-gray-100">
                                                {"NO DATA"}
                                            </p>
                                        </div>
                                    ) : (
                                        // sort map into rarity level
                                        Object.keys(map)
                                            .sort((a, b) => {
                                                const materialA =
                                                    getMaterialObject(a);
                                                const materialB =
                                                    getMaterialObject(b);
                                                if (
                                                    materialA.rarity ===
                                                    materialB.rarity
                                                ) {
                                                    return (
                                                        Number(
                                                            materialB.sortId,
                                                        ) -
                                                        Number(materialA.sortId)
                                                    );
                                                } else {
                                                    return (
                                                        Number(
                                                            materialB.rarity,
                                                        ) -
                                                        Number(materialA.rarity)
                                                    );
                                                }
                                            })
                                            .map((id, idx) => (
                                                <Flipped
                                                    flipId={id}
                                                    key={idx}
                                                    stagger
                                                >
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
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}
