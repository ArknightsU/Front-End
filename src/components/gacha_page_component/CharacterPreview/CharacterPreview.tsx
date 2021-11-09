/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getItem, useWindowSize } from "@components";
import { CustomImage } from "@components/common";
import React, { useEffect, useState } from "react";
import { useInterval } from "react-use";
import { DB_NAME } from "../../common/LocalForge/db_name";
/**
 * Character Preview Component
 */
interface CharacterPreviewProps {
    pools: Array<any>;
    focused: number;
    poolSelected: boolean;
    //DEV_featured: Array<any>;
}
export function CharacterPreview(props: CharacterPreviewProps): JSX.Element {
    const window_size = useWindowSize();
    const charData = props.pools[props.focused].featured.six;
    // character image's url array
    const char_img = charData.map((v: string) => {
        return "/img/characters/" + v + "_2.webp";
    });
    // names of character's array
    const [returnText, setReturnText] = useState<string[]>([]);
    // define render or not
    // used becuase of performance issue
    const [render, setRender] = useState(false);
    useEffect(() => {
        setRender(false);
        setTimeout(() => {
            setRender(true);
        }, 500);
    }, [props.focused]);

    // In limited type banner, there's two featured six star.
    // Used to Show both six star
    const [count, setCount] = React.useState(0);
    useInterval(
        () => {
            setCount((count + 1) % char_img.length);
        },
        props.pools.length === 1 ? null : 12000,
    );
    // if char data changes get characters name from db
    useEffect(() => {
        setCount(0);
        setReturnText([]);
        const getName = async (id: string): Promise<string> => {
            const name = await getItem(DB_NAME.character_table, id);
            try {
                // @ts-ignore
                const trans_name = name.kr_name;
                return trans_name;
            } catch (e) {
                return "";
            }
        };
        for (const char of charData) {
            getName(char).then((name) => {
                setReturnText((prev) => [...prev, name]);
            });
        }
    }, [charData]);
    // if it's size is MOBILE, then remove
    if (window_size.width < 768) {
        return <></>;
    }
    return (
        <div
            className={`w-0 md:w-full h-full relative overflow-hidden flex justify-center items-center`}
        >
            {char_img.map((v: string, i: number) => (
                <div
                    className={`absolute w-3/5 h-full transition-all duration-1000`}
                    key={i}
                    style={{
                        zIndex: 10 - i,
                        transform: `translateY(-10px) scale(1.6) translateX(${
                            props.poolSelected
                                ? i === count
                                    ? -1 * window_size.width * 0.15
                                    : -1 * window_size.width * 0.6
                                : i === count
                                ? window_size.width * 0.15
                                : window_size.width * 0.6
                        }px)`,
                        opacity: i === count ? 1 : 0,
                    }}
                >
                    {v.includes("undefined") ? (
                        <></>
                    ) : render ? (
                        <CustomImage src={v} priority={true} />
                    ) : (
                        <></>
                    )}
                </div>
            ))}
            <CharacterText
                poolSelected={props.poolSelected}
                window_size={window_size}
                returnText={returnText}
            />
        </div>
    );
}

interface CharacterTextProps {
    returnText: string[];
    poolSelected: boolean;
    window_size: { height: number; width: number };
}
function CharacterText(props: CharacterTextProps): JSX.Element {
    return (
        <div
            className={`transition-all duration-1000 absolute w-auto h-auto bottom-16 flex flex-col z-50`}
            style={{
                transform: `translateX(${
                    props.poolSelected
                        ? props.window_size.width * -0.3
                        : props.window_size.width * 0.3
                }px)`,
            }}
        >
            <div className="w-auto h-10 flex items-start">
                <CustomImage src="/ui/GachaAnimationImage/UI_GACHA_TEN_STAR_RARITY5.webp" />
            </div>
            <div className="w-auto h-16 pl-4 pr-4 flex flex-row justify-center items-center bg-gradient-to-r from-transparent via-truegray-800 to-transparent bg-opacity-40">
                <div className="absolute w-full h-1/5 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
                <div className="w-auto h-full flex flex-col justify-center items-start">
                    <span className="pr-12 pl-12 lg:pr-24 lg:pl-24 h-full flex justify-center items-center font-sans font-black italic text-white md:text-2xl xl:text-2xl 2xl:text-3xl">
                        {"오퍼레이터 "}
                        {props.returnText.join(", ")}
                        {" 획득확률 UP! "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-full w-auto ml-2 lg:ml-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 15.707a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414 0zm0-6a1 1 0 010-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 5.414 5.707 9.707a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
}
