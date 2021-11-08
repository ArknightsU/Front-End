/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useWindowSize } from "@components";
import { CustomImage } from "@components/common";
import React, { useEffect, useState } from "react";
import { useCharObject } from "@components";
import { useInterval } from "react-use";

interface CompactGachaAnimationProps {
    setDoAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setGachaData: React.Dispatch<React.SetStateAction<string[]>>;
    gachaData: Array<string>;
}
export function CompactGachaAnimation({
    setDoAnimation,
    setGachaData,
    gachaData,
}: CompactGachaAnimationProps): JSX.Element {
    // SAFETY OPTION
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const window_size = useWindowSize();
    const char_image_ratio = (window_size.width * 3) / 4;
    const setAnimationEnd = () => {
        setDoAnimation(false);
        setGachaData([]);
    };
    const [count, setCount] = useState(-1);
    useInterval(
        () => {
            setCount((prev) => prev + 1);
        },
        count >= gachaData.length ? null : 150,
    );
    return (
        <div
            className="absolute w-screen h-screen z-animation bg-gachaAnimation bg-no-repeat bg-center flex justify-center items-center overflow-hidden"
            style={{ backgroundSize: "cover" }}
        >
            <SkipButton
                isAnimationEnd={isAnimationEnd}
                setAnimationEnd={setAnimationEnd}
            />
            {gachaData.length === 1 ? (
                <div className="relative w-3/4 h-2/3 flex flex-row justify-center items-center space-x-0">
                    {gachaData.map((char, index) => (
                        <CompactGachaAnimationChild
                            count={count}
                            char={char}
                            key={index}
                            index={index}
                            setIsAnimationEnd={setIsAnimationEnd}
                        />
                    ))}
                </div>
            ) : (
                <div className="relative w-3/4 h-2/3 grid grid-rows-5 grid-cols-2 md:grid-cols-5 md:grid-rows-2 items-center">
                    {gachaData.map((char, index) => (
                        <CompactGachaAnimationChild
                            count={count}
                            char={char}
                            key={index}
                            index={index}
                            setIsAnimationEnd={setIsAnimationEnd}
                        />
                    ))}
                </div>
            )}

            <div
                className="absolute w-screen h-screen"
                style={{ zIndex: 105 }}
                onClick={() => {
                    if (isAnimationEnd) setAnimationEnd();
                }}
            ></div>
        </div>
    );
}

interface CompactGachaAnimationChildProps {
    char: string;
    index: number;
    count: number;
    setIsAnimationEnd: React.Dispatch<React.SetStateAction<boolean>>;
}
const RARITY = { six: 5, five: 4, four: 3, three: 2 };
const CompactGachaAnimationChild: React.FC<CompactGachaAnimationChildProps> = (
    props,
) => {
    const [char_obj, loading] = useCharObject(props.char);
    // @ts-ignore
    const rarity = RARITY[char_obj["rarity"]];
    const charImageUrl = `/img/avatars/${props.char}.webp`;
    const bgImageUrl = `/ui/UI_GACHA_STATISTICS_RARITY${rarity}.webp`;
    const [translateY, setTranslateY] = useState("-100%");
    useEffect(() => {
        if (props.count >= props.index) setTranslateY("0px");
    }, [props.count]);
    useEffect(() => {
        if (rarity < 3) {
            props.setIsAnimationEnd(true);
        }
        setTimeout(() => {
            props.setIsAnimationEnd(true);
        }, 2500);
    }, []);
    return (
        <>
            <div
                className="relative w-full h-full flex justify-center items-center transition-all duration-1500"
                style={{
                    transform: `translateY(${translateY})`,
                    opacity: props.count >= props.index ? 1 : 0,
                }}
            >
                <div
                    className="relative w-full h-full overflow-hidden"
                    style={{ zIndex: 102 }}
                >
                    {bgImageUrl.includes("undefined") ? (
                        <></>
                    ) : rarity >= 3 ? (
                        <div
                            className="absolute flex w-full h-full justify-center items-center"
                            style={{
                                transform: `scale(${
                                    rarity === 5 ? "1.7" : "1"
                                })`,
                            }}
                        >
                            <CustomImage src={bgImageUrl} />
                        </div>
                    ) : (
                        <></>
                    )}
                    <div
                        className="absolute w-full h-full overflow-hidden flex justify-center items-center"
                        style={{ transform: "scale(0.8)" }}
                    >
                        <CustomImage src={charImageUrl} />
                    </div>
                </div>
            </div>
        </>
    );
};

interface SkipButtonProps {
    isAnimationEnd: boolean;
    setAnimationEnd: () => void;
}
const SkipButton: React.FC<SkipButtonProps> = (props) => {
    return (
        <div
            className="absolute w-20 h-16 md:w-36 md:h-32 top-5 right-8"
            style={{ zIndex: 106 }}
            onClick={() => {
                if (props.isAnimationEnd) props.setAnimationEnd();
            }}
        >
            <CustomImage src="/ui/GachaAnimationImage/UI_GACHA_ANIMATION_SKIP.webp" />
        </div>
    );
};
