/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useWindowSize } from "@components";
import { CustomImage } from "@components/common";
import React, { useEffect, useState } from "react";
import { useCharObject } from "@components";

interface GachaAnimationProps {
    setDoAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    setGachaData: React.Dispatch<React.SetStateAction<string[]>>;
    gachaData: Array<string>;
}
export function GachaAnimation({
    setDoAnimation,
    setGachaData,
    gachaData,
}: GachaAnimationProps): JSX.Element {
    // SAFETY OPTION
    const [isAnimationEnd, setIsAnimationEnd] = useState(false);
    const window_size = useWindowSize();
    const char_image_ratio = (window_size.width * 3) / 4;
    // @ts-ignore
    const bg_image_height = (char_image_ratio / 10) * 3;
    const char_image_height = (char_image_ratio / 10) * 3;
    const char_image_width = ((char_image_ratio / 10) * 3) / 2;
    const profession_size =
        // @ts-ignore
        (char_image_ratio / 10) * 0.8;
    const translateX = (char_image_width - bg_image_height / 3) / 2;
    const setAnimationEnd = () => {
        setDoAnimation(false);
        setGachaData([]);
    };
    return (
        <div
            className="absolute w-screen h-screen z-animation bg-gachaAnimation bg-no-repeat bg-center flex justify-center items-center overflow-hidden"
            style={{ backgroundSize: "cover" }}
        >
            <SkipButton
                isAnimationEnd={isAnimationEnd}
                setAnimationEnd={setAnimationEnd}
            />
            <div className="relative w-3/4 h-2/3 flex flex-row justify-center items-center space-x-0">
                {gachaData.map((char, index) => (
                    <GachaAnimationChild
                        char={char}
                        key={index}
                        charImageWidth={char_image_width}
                        charImageHeight={char_image_height}
                        charBgHeight={bg_image_height}
                        professionSize={profession_size}
                        translateX={translateX}
                        index={index}
                        setIsAnimationEnd={setIsAnimationEnd}
                    />
                ))}
            </div>
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

interface GachaAnimationChildProps {
    char: string;
    charImageWidth: number;
    charImageHeight: number;
    charBgHeight: number;
    professionSize: number;
    translateX: number;
    index: number;
    setIsAnimationEnd: React.Dispatch<React.SetStateAction<boolean>>;
}
const RARITY = { six: 5, five: 4, four: 3, three: 2 };
const GachaAnimationChild: React.FC<GachaAnimationChildProps> = (props) => {
    const [char_obj, loading] = useCharObject(props.char);
    // @ts-ignore
    const rarity = RARITY[char_obj["rarity"]];
    const charImageUrl = `/img/portraits/${props.char}_1.webp`;
    const bgImageUrl = `/ui/GachaAnimationImage/UI_GACHA_TEN_BACKGROUND_RARITY${rarity}.webp`;
    const rarityShineUrl = `/ui/gacha_anime_shine_rarity${rarity}.webp`;
    // @ts-ignore
    // eslint-disable-next-line prettier/prettier
    const professiontImageUrl = `/ui/GachaAnimationImage/UI_GACHA_WHITE_${char_obj["profession"]}.webp`;
    const [translateY, setTranslateY] = useState(
        props.index % 2 == 1 ? "-100%" : "100%",
    );
    const [expand, setExpand] = useState(false);
    console.log(translateY);
    useEffect(() => {
        console.log("rendered");
        setTimeout(() => {
            setTranslateY("0px");
        }, 250);

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
                onTransitionEnd={() => {
                    setExpand(true);
                }}
                className="relative w-1/10 flex justify-center items-center transition-transform duration-1500"
                style={{
                    height: props.charBgHeight,
                    transform: `translateY(${translateY})`,
                }}
            >
                {rarity >= 3 ? (
                    <div
                        className="absolute transition-transform duration-1000"
                        style={{
                            width: "100%",
                            height: "80vh",
                            zIndex: 101,
                            transform: `scaleY(${expand ? "100%" : "0%"})`,
                        }}
                        onTransitionEnd={() => {
                            props.setIsAnimationEnd(true);
                        }}
                    >
                        <CustomImage src={rarityShineUrl} type="stretch" />
                    </div>
                ) : (
                    <></>
                )}

                <div
                    className="absolute w-full bottom-0 overflow-hidden"
                    style={{ height: props.charBgHeight, zIndex: 102 }}
                >
                    {bgImageUrl.includes("undefined") ? (
                        <></>
                    ) : (
                        <CustomImage src={bgImageUrl} type="stretch" />
                    )}
                    <div
                        className="absolute bottom-0 overflow-hidden flex justify-center items-center"
                        style={{
                            height: props.charImageHeight,
                            width: props.charImageWidth,
                            left: -props.translateX,
                        }}
                    >
                        <CustomImage src={charImageUrl} />
                    </div>
                </div>
                <div
                    className="absolute"
                    style={{
                        height: props.professionSize,
                        width: props.professionSize,
                        bottom: -props.professionSize / 2,
                        zIndex: 103,
                    }}
                >
                    {professiontImageUrl.includes("undefined") ? (
                        <></>
                    ) : (
                        <CustomImage src={professiontImageUrl} />
                    )}
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
