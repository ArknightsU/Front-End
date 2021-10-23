import { useWindowSize } from "@components";
import { CustomImage } from "@components/common";
import { useCharTable } from "@components/hooks/useCharTable";
import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { useInterval } from "react-use";

interface CharacterPreviewProps {
    pools: Array<any>;
    focused: number;
    poolSelected: boolean;
}
export function CharacterPreview(props: CharacterPreviewProps): JSX.Element {
    const window_size = useWindowSize();
    const DEV_featured = [
        "char_1013_chen2",
        "char_437_mizuki",
        "char_421_crow",
    ];
    const charData = DEV_featured.map((v) => {
        const [r, l] = useCharTable(v);
        return { name: v, data: r };
    });
    const featuredSixStars = charData.filter((value) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return value.data["rarity"] === "six";
    });
    const char_img = featuredSixStars.map((v) => {
        return "/img/characters/" + v.name + "_2.webp";
    });
    const [count, setCount] = React.useState(0);
    useInterval(() => {
        setCount((count + 1) % char_img.length);
    }, 12000);
    if (window_size.width < 768) {
        return <></>;
    }
    return (
        <div className={`w-0 md:w-full h-full relative overflow-hidden`}>
            {char_img.map((v, i) => (
                <Transition
                    as={Fragment}
                    appear={true}
                    show={count === i}
                    enter={`transition-all duration-1000 absolute`}
                    leave={`transition-all duration-1000 absolute`}
                    unmount={false}
                    enterFrom={`${
                        props.poolSelected ? "-left-full" : "-right-full"
                    }  absolute`}
                    enterTo={`${
                        props.poolSelected ? "left-0" : "right-0"
                    }  absolute`}
                    entered={`${
                        props.poolSelected
                            ? "absolute left-0"
                            : " absolute right-0"
                    }`}
                    leaveFrom={`${
                        props.poolSelected ? "left-0" : "right-0"
                    }  absolute`}
                    leaveTo={`${
                        props.poolSelected ? "-left-full" : "-right-full"
                    }  absolute`}
                >
                    <div
                        className={`absolute w-3/5 h-full transition-all ${
                            props.poolSelected ? "left-0" : "right-0"
                        }`}
                        key={i}
                        style={{
                            zIndex: 10 - i,
                            transform: "translateY(-10px) scale(1.6)",
                        }}
                    >
                        <CustomImage src={v} />
                    </div>
                </Transition>
            ))}
            <CharacterText
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                sixstar={featuredSixStars}
            />
        </div>
    );
}

interface CharacterTextProps {
    sixstar: Array<any>;
}
function CharacterText(props: CharacterTextProps): JSX.Element {
    const names = props.sixstar.map((v) => v.data["kr_name"]);
    return (
        <div className="absolute w-auto h-auto bottom-16 right-8 z-10 flex flex-col">
            <div className="w-auto h-10 flex items-start">
                <CustomImage src="/ui/GachaAnimationImage/UI_GACHA_TEN_STAR_RARITY5.webp" />
            </div>
            <div className="w-auto h-16 pl-4 pr-4 flex flex-row justify-center items-center bg-gradient-to-r from-transparent via-truegray-800 to-transparent bg-opacity-40">
                <div className="absolute w-full h-1/5 bg-gradient-to-r from-transparent via-white to-transparent opacity-40"></div>
                <div className="w-auto h-full flex flex-col justify-center items-start">
                    <span className="pr-12 pl-12 lg:pr-24 lg:pl-24 h-full flex justify-center items-center font-sans font-black italic text-white md:text-2xl xl:text-2xl 2xl:text-3xl">
                        {"오퍼레이터 미즈키 " +
                            names.join(", ") +
                            "첸 획득확률 UP! "}
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
