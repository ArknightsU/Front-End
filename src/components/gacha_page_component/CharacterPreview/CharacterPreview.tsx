import { useWindowSize } from "@components";
import { CustomImage } from "@components/common";
import React from "react";
import { useInterval } from "react-use";
import { useCharObject } from "../../common/LocalForge/hooks/useCharObject";

interface CharacterPreviewProps {
    pools: Array<any>;
    focused: number;
    poolSelected: boolean;
    DEV_featured: Array<any>;
}
export function CharacterPreview(props: CharacterPreviewProps): JSX.Element {
    const window_size = useWindowSize();
    const charData = props.DEV_featured.map((v) => {
        const [data, loading] = useCharObject(v);
        return { name: v, data: data };
    });
    const featuredSixStars = charData.filter((value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value.data["rarity"] === "six";
    });
    const char_img = featuredSixStars.map((v) => {
        return "/img/characters/" + v.name + "_2.webp";
    });
    const returnText = featuredSixStars.map((v) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return v.data["kr_name"];
    });
    const [count, setCount] = React.useState(0);
    useInterval(() => {
        setCount((count + 1) % char_img.length);
    }, 12000);
    if (window_size.width < 768) {
        return <></>;
    }
    return (
        <div
            className={`w-0 md:w-full h-full relative overflow-hidden flex justify-center items-center`}
        >
            {char_img.map((v, i) => (
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
                    {v.includes("undefined") ? <></> : <CustomImage src={v} />}
                </div>
            ))}
            <CharacterText
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                sixstar={featuredSixStars}
                length={featuredSixStars.length}
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
