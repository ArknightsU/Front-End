/* eslint-disable @typescript-eslint/ban-ts-comment */
interface FilterProps {
    rarity: string[];
    profession: string[];
    setRarity: React.Dispatch<React.SetStateAction<Array<string>>>;
    setProfession: React.Dispatch<React.SetStateAction<Array<string>>>;
    charNameArray: string[];
    focused: MaterialCalculation[];
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
    open: boolean;
}

import { CustomImage, useWindowSize } from "@components";
import { EclipseSpinner } from "@components/common/EclipseSpinner";
import { RARITY, PROFESSION } from "@constants";
import { useCharObject } from "../../common/LocalForge/hooks/useCharObject";
import { MaterialCalculation } from "@components/common";
import { getMaterialKeys } from "../getMaterialKeys";
import { Flipped, Flipper } from "react-flip-toolkit";

export function Filter(props: FilterProps): JSX.Element {
    const screen_size = useWindowSize();
    // calculate width with screen size
    const rarityWidth = props.open ? (screen_size.width - 20) / 7 : 0;
    const profWidth = props.open ? (screen_size.width - 20) / 10 : 0;
    const renderArray = (): string[] => {
        const newArray = [
            ...getMaterialKeys(props.focused),
            ...props.charNameArray,
        ];
        const set = Array.from(new Set(newArray));
        return set;
    };
    return (
        <div className="w-full h-auto flex flex-col justify-center items-center gap-y-4">
            {/* Select Rarity */}
            <div className="flex flex-col w-11/12 items-start">
                <span className="font-sans text-black font-bold text-lg md:text-xl w-full text-left">
                    {"레어도 선택"}
                </span>
                <hr className="w-full h-0 border-black bg-black" />
            </div>
            <div className="w-11/12 h-auto flex flex-row justify-evenly items-center">
                {Object.keys(RARITY).map((rare, idx) => (
                    <Rarity
                        width={rarityWidth}
                        rarity={rare}
                        rarity_array={props.rarity}
                        setRarity={props.setRarity}
                        key={idx}
                    />
                ))}
            </div>
            {/* Select Profession */}
            <div className="flex flex-col w-11/12 items-start mt-4 md:mt-10">
                <span className="font-sans text-black font-bold text-lg md:text-xl w-full text-left">
                    {"직군 선택"}
                </span>
                <hr className="w-full h-0 border-black bg-black" />
            </div>
            <div className="w-11/12 h-auto flex flex-row justify-evenly items-center">
                {Object.keys(PROFESSION).map((prof, idx) => (
                    <Profession
                        width={profWidth}
                        profession={prof}
                        profession_array={props.profession}
                        setProfession={props.setProfession}
                        key={idx}
                    />
                ))}
            </div>
            {/* Select Characters */}
            <div className="flex flex-col w-11/12 items-start mt-4 md:mt-10">
                <span className="font-sans text-black font-bold text-lg md:text-xl w-full text-left">
                    {"오퍼레이터 선택"}
                </span>
                <hr className="w-full h-0 border-black bg-black" />
            </div>
            <div className="w-11/12 h-auto flex flex-row justify-start items-start flex-wrap gap-x-2 gap-y-2">
                <Flipper
                    flipKey={props.charNameArray.join(" ")}
                    spring={"stiff"}
                >
                    <ul className="w-full h-auto flex flex-row justify-start items-start flex-wrap gap-x-2 gap-y-2">
                        {props.charNameArray.map((char, idx) => (
                            <Flipped flipId={char} key={idx}>
                                <li className="w-auto h-auto">
                                    <FilterChild
                                        char={char}
                                        focused={props.focused}
                                        setFocused={props.setFocused}
                                    />
                                </li>
                            </Flipped>
                        ))}
                    </ul>
                </Flipper>
            </div>
        </div>
    );
}

// Rarity Selector Component Below
interface RarityProps {
    rarity_array: string[];
    rarity: string;
    width: number;
    setRarity: React.Dispatch<React.SetStateAction<Array<string>>>;
}
const Rarity_Dict: { [key: string]: number } = {
    six: 5,
    five: 4,
    four: 3,
    three: 2,
    two: 1,
    one: 0,
};
function Rarity(props: RarityProps): JSX.Element {
    const src = `/ui/CharacterInfo/UI_STAR_RARITY${
        Rarity_Dict[props.rarity]
    }.webp`;
    const onClickHandle = () => {
        if (props.rarity_array.includes(props.rarity)) {
            props.setRarity((prev) => prev.filter((v) => v !== props.rarity));
        } else {
            props.setRarity((prev) => {
                const newVar = [...prev, props.rarity];
                return newVar;
            });
        }
    };
    const window_size = useWindowSize();
    const isMobile = window_size.width < 768 ? true : false;
    return (
        <div
            className={`${
                props.rarity_array.includes(props.rarity)
                    ? "bg-yellow-400"
                    : "bg-black"
            } p-2 rounded-md`}
            style={{
                width: props.width,
                height: isMobile ? props.width / 2 : props.width / 4,
            }}
            onClick={onClickHandle}
        >
            {isMobile ? (
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <CustomImage src="/ui/CharacterInfo/UI_STAR_RARITY0.webp" />
                    <p className="text-white font-bold text-lg">
                        {Rarity_Dict[props.rarity] + 1}
                    </p>
                </div>
            ) : (
                <CustomImage src={src} />
            )}
        </div>
    );
}

// Profession Selector Componenet Below
interface ProfessionProps {
    profession_array: string[];
    profession: string;
    width: number;
    setProfession: React.Dispatch<React.SetStateAction<Array<string>>>;
}
function Profession(props: ProfessionProps): JSX.Element {
    const onClickHandle = () => {
        if (props.profession_array.includes(PROFESSION[props.profession])) {
            props.setProfession((prev) =>
                prev.filter((v) => v !== PROFESSION[props.profession]),
            );
        } else {
            props.setProfession((prev) => {
                const newVar = [...prev, PROFESSION[props.profession]];
                return newVar;
            });
        }
    };
    const src = `/img/classes/class_${props.profession}.webp`;
    return (
        <div
            className={`${
                props.profession_array.includes(PROFESSION[props.profession])
                    ? "bg-yellow-400"
                    : "bg-black"
            } `}
            style={{
                width: props.width,
                height: props.width,
            }}
            onClick={onClickHandle}
        >
            <CustomImage src={src} />
        </div>
    );
}

// Character Filter Child Below
interface FilterChildProps {
    char: string;
    focused: MaterialCalculation[];
    setFocused: React.Dispatch<
        React.SetStateAction<Array<MaterialCalculation>>
    >;
}
function FilterChild(props: FilterChildProps): JSX.Element {
    const [char, loading] = useCharObject(props.char);
    const isFocused = getMaterialKeys(props.focused).includes(props.char)
        ? true
        : false;
    const onClickHandle = () => {
        if (isFocused) {
            props.setFocused((prev) =>
                prev.filter((v) => v.name !== props.char),
            );
        } else {
            props.setFocused((prev) => {
                const newValue: MaterialCalculation = {
                    name: props.char,
                    allSkill:
                        // @ts-ignore
                        Rarity_Dict[char.rarity] >= 2
                            ? new Array(6).fill(false)
                            : null,
                    skill1:
                        // @ts-ignore
                        Rarity_Dict[char.rarity] >= 3
                            ? new Array(3).fill(false)
                            : null,
                    skill2:
                        // @ts-ignore
                        Rarity_Dict[char.rarity] >= 3
                            ? new Array(3).fill(false)
                            : null,
                    skill3:
                        // @ts-ignore
                        Rarity_Dict[char.rarity] >= 5
                            ? new Array(3).fill(false)
                            : null,
                    upgrade:
                        // @ts-ignore
                        Rarity_Dict[char.rarity] >= 2
                            ? // @ts-ignore
                              Rarity_Dict[char.rarity] >= 3
                                ? [false, false]
                                : [false, null]
                            : null,
                };
                const value = [...prev, newValue];
                return value;
            });
        }
    };
    return (
        <div
            className="h-auto w-auto p-2 bg-white relative"
            onClick={onClickHandle}
        >
            {loading ? (
                <div className="h-full w-full">
                    <EclipseSpinner />
                    <div>{"LOADING"}</div>
                </div>
            ) : (
                <>
                    <div
                        className="h-6 w-18 md:h-8 md:w-24 absolute -top-1 -left-1 bg-yellow-300 flex justify-end items-end"
                        style={{ zIndex: 12 }}
                    >
                        <div className="h-full w-11/12 bg-black flex flex-row">
                            <div className="h-full w-1/2 flex justify-center items-center">
                                <p className="h-auto w-auto text-truegray-600 font-bold font-mono text-xxs md:text-xs leading-none align-middle text-center">
                                    {"DATA\nNO./"}
                                </p>
                            </div>
                            <div className="h-full w-1/2 flex justify-center items-center">
                                <p className="h-auto w-auto text-white font-bold font-sans text-xs md:text-sm leading-none align-middle text-center">
                                    {
                                        // @ts-ignore
                                        char.displayNumber
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                    <div
                        className="h-24 w-24 md:h-40 md:w-40"
                        style={{ zIndex: 11 }}
                    >
                        <CustomImage src={`/img/avatars/${props.char}.webp`} />
                    </div>
                    <div className="h-auto w-24 md:h-auto md:w-40 relative">
                        <p className="top-0 left-0 text-black font-bold text-xxs">
                            {"Operator Name"}
                        </p>
                        <hr className="h-0 border-black" />
                    </div>
                    <div className="h-4 w-24 md:h-6 md:w-40">
                        <p className="h-auto w-auto font-sans text-md md:text-lg font-extrabold">
                            {
                                // @ts-ignore
                                char.kr_name
                            }
                        </p>
                    </div>

                    <div
                        className="absolute w-full h-full flex justify-center items-center bg-yellow-300 bg-opacity-70 top-0 left-0 transition-all duration-700 opa"
                        style={{
                            zIndex: 52,
                            opacity: isFocused ? 1 : 0,
                        }}
                    >
                        <div className="w-1/2 h-1/2 flex flex-col justify-center items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-1/2 w-1/2"
                                viewBox="0 0 20 20"
                                fill="#00A52D"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <p className="h-auto w-auto text-green-800 font-sans text-md md:text-lg font-extrabold">
                                {"CHECKED!"}
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
